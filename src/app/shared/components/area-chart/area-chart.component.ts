import { StringToDatePipe } from './../../pipes/string-to-date.pipe';
import { Component, DoCheck, ElementRef, HostListener, Input, KeyValueDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3'
import { IAreaChartData } from '../../models/area-chart-data';
import { clamp, min } from 'date-fns';
import { IAreaChartConfig } from '../../models/area-chart-config';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit{

  margin: {top: number, right: number, bottom: number, left: number} = {top: 20, right: 0, bottom: 30, left: 35}
  pathGradient = 'gradient-id-1'
  areaGradient = 'gradient-id-2'
  chart:string = "chart"

  width!: number
  height!: number
  svg!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  defs!: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
  y!: d3.AxisScale<number>
  x!: d3.AxisScale<Date>
  testGradient!: any

  @Input() chartConfig: IAreaChartConfig = {
    chartColors: ['#f8c03f', '#32d2ac', '#5693e9'],
    thresholds: [0.3, 0.6],
    domain: [0, 100],
    unit: '',
    data: [
      { date: new Date(new Date().setDate( new Date().getDate() + 0)), value: 20 },
      { date: new Date(new Date().setDate( new Date().getDate() + 1)), value: 60 },
      { date: new Date(new Date().setDate( new Date().getDate() + 2)), value: 90 },
      { date: new Date(new Date().setDate( new Date().getDate() + 3)), value: 20 },
      { date: new Date(new Date().setDate( new Date().getDate() + 4)), value: 60 },
      { date: new Date(new Date().setDate( new Date().getDate() + 5)), value: 90 },
      { date: new Date(new Date().setDate( new Date().getDate() + 6)), value: 100 },
    ]
  }

  

  differ: any
  constructor(
    private elementRef: ElementRef,
    private differs: KeyValueDiffers) {
      this.differ = this.differs.find({}).create()
     }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth
    this.height = this.elementRef.nativeElement.offsetHeight
    this.renderChart()
  }


  renderChart() {
    this.y = this.createY()
    this.x = this.createX()
    this.appendChartToDOM()
    this.appendXAxis()
    this.appendYAxis()
    this.appendLinearGradientToPath()
    this.appendLinearGradientToArea()
    this.appendArea()
    this.appendPath()
  /*   this.appendBlur() */
    this.elementRef.nativeElement.appendChild(this.svg.node())
  }

  appendChartToDOM() {
    const svg: any = d3.create('svg')
    svg
      .attr('width', '100%')
      .attr('height', '100%')
    this.svg = svg

    this.defs = this.svg.append('defs')
  }

  removeChart() {
    d3.selectAll("svg > *").remove();
  }

  createX(): d3.AxisScale<Date> {
    return d3.scaleUtc()
      .domain(<[Date, Date]>d3.extent(this.chartConfig.data, (d) => d.date))
      .range(this.chartConfig.margins ? [this.chartConfig.margins.left, this.width - this.chartConfig.margins.right] : [this.margin.left, this.width - this.margin.right])
  }


  appendXAxis() {

    const xAxis = (g: any) => {
      g.attr('transform', `translate(0, -${this.chartConfig.margins ? this.chartConfig.margins.top :this.margin.top})`)
      .call(d3.axisBottom(this.x).ticks(this.width / (this.width * 0.15) ).tickSizeOuter(0).tickSize(this.height))
      .call((g: any) => g.select('.domain').remove())
    }
    this.svg.append('g')
      .call(xAxis)
  }


  createY(): d3.AxisScale<number> {
    return d3.scaleLinear()
    .domain(this.chartConfig.domain).nice()
    .range(this.chartConfig.margins ? [this.height - this.chartConfig.margins.bottom, this.chartConfig.margins.top] : [this.height - this.margin.bottom, this.margin.top])
  }


  appendYAxis() {
    const yAxis = (g: any) => {
      g.attr('transform', `translate(${this.width},0)`)
      .call(d3.axisLeft(this.y).ticks(this.height / (this.height * 0.15)).tickSize(this.width - (this.chartConfig.margins?.left || this.margin.left) + ( this.chartConfig.margins?.right || this.margin.right)))
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.select(".tick:last-of-type text").append("tspan").text(this.chartConfig.unit))
    }

    this.svg.append('g')
    .call(yAxis)

  }


  appendLinearGradientToPath() {
    const color = d3.scaleOrdinal<string>()

    this.svg.append('linearGradient')
      .attr("id", this.pathGradient)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", this.height - (this.chartConfig.margins ? this.chartConfig.margins?.bottom : this.margin.bottom))
      .attr("x2", 0)
      .attr("y2", this.chartConfig.margins ? this.chartConfig.margins.top : this.margin.top)
  .selectAll("stop")
      .exit()
      .remove()
      .data(d3.ticks(0, 1, 10))
  .join("stop")
      .attr("offset", d => d )
      .attr("stop-color", d => this.colorFinder(d, [...this.chartConfig.thresholds!, 1]))
  }

  appendLinearGradientToArea() {
    const color = d3.scaleOrdinal<string>()

    const gradient: any = this.defs.append('linearGradient')
    .attr("id", this.areaGradient)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", this.height - (this.chartConfig.margins ? this.chartConfig.margins.bottom : this.margin.bottom))
    .attr("x2", 0)
    .attr("y2", this.chartConfig.margins ? this.chartConfig.margins.top : this.margin.top)

    /* First */
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.chartConfig.chartColors![0])
      .attr('stop-opacity', 0)
      .attr('offset', this.chartConfig.thresholds![0] * 10 + '%')
      .attr('stop-color', this.chartConfig.chartColors![0])
      .attr('stop-opacity', 0.)
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![0] * 80 + '%')
      .attr('stop-color', this.chartConfig.chartColors![0])
      .attr('stop-opacity', 0.3)
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![0] * 100 + '%')
      .attr('stop-color', this.chartConfig.chartColors![0])
      .attr('stop-opacity', 0.2)

      /* Second */
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![0] * 100 + '%')
      .attr('stop-color', this.chartConfig.chartColors![1])
      .attr('stop-opacity', 0.05)
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![1] * 80 + '%')
      .attr('stop-color', this.chartConfig.chartColors![1])
      .attr('stop-opacity', 0.3)
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![1] * 100 + '%')
      .attr('stop-color', this.chartConfig.chartColors![1])
      .attr('stop-opacity', 0.4)

      /* Third */
    gradient.append('stop')
      .attr('offset', this.chartConfig.thresholds![1] * 100 + '%')
      .attr('stop-color', this.chartConfig.chartColors![2])
      .attr('stop-opacity', 0.4)
    gradient.append('stop')
      .attr('offset', '95%')
      .attr('stop-color', this.chartConfig.chartColors![2])
      .attr('stop-opacity', 0.8)
  }

  colorFinder(data: number, stops: number[] = [0.3, 0.6, 1]): string {
    for(let i = 0; i < stops.length; i++) {
      if(data <= stops[i]) return this.chartConfig.chartColors![i]
    }
    return this.chartConfig.chartColors![0]
  }

  opacityFinder(data: number, minmax: number[] = [0.6, 0.9]): string{
    console.log(data);
    if (data < minmax[0]) return minmax[0] + ""
    if (data > minmax[1]) return minmax[1] + ""
    return data + ""
  }


  appendPath() {
    const line: any = d3.line()
      .curve(d3.curveStep)
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => this.x(d.date)!)
      .y((d:any) => this.y(d.value)!)

    this.svg.append('path')
    .datum(this.chartConfig.data)
    .attr("fill", "none")
    .attr("stroke", "url(#" + this.pathGradient + ")")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)
  }

  
  appendArea() {
    const area: any = d3.area()
      .curve(d3.curveStep)
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => this.x(d.date)!)
      .y0(this.height - (this.chartConfig.margins ? this.chartConfig.margins.bottom : this.margin.bottom))
      .y1((d: any) => this.y(d.value)!)

    this.svg.append('path')
    .datum(this.chartConfig.data)
    .attr("fill", "url(#" + this.areaGradient + ")")
    .attr("d", area)
  }
}



