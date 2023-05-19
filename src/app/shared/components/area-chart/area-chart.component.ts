import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { IAreaChartData } from '../../models/area-chart-data';
import { clamp, min } from 'date-fns';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {


  margin: {top: number, right: number, bottom: number, left: number} = {top: 20, right: 0, bottom: 30, left: 30}
  pathGradient = 'gradient-id-1'
  areaGradient = 'gradient-id-2'
  chart:string = "chart"

  width!: number
  height!: number
  chartElement!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  y!: d3.AxisScale<number>
  x!: d3.AxisScale<Date>


  @Input() chartColor: string[] = ['#f8c03f', '#32d2ac', '#5693e9']

  @Input() unit: string = ''
  @Input() data: IAreaChartData[] = [
    { date: new Date(new Date().setDate( new Date().getDate() + 0)), value: 20 },
    { date: new Date(new Date().setDate( new Date().getDate() + 1)), value: 60 },
    { date: new Date(new Date().setDate( new Date().getDate() + 2)), value: 90 },
    { date: new Date(new Date().setDate( new Date().getDate() + 3)), value: 20 },
    { date: new Date(new Date().setDate( new Date().getDate() + 4)), value: 60 },
    { date: new Date(new Date().setDate( new Date().getDate() + 5)), value: 90 },
    { date: new Date(new Date().setDate( new Date().getDate() + 6)), value: 100 },
  ]


  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth
    this.height = this.elementRef.nativeElement.offsetHeight
    this.y = this.createY()
    this.x = this.createX()
    this.createChart()
    this.appendXAxis()
    this.appendYAxis()
    this.appendLinearGradientToPath()
    this.appendLinearGradientToArea()
    this.appendArea()
    this.appendPath()
    this.elementRef.nativeElement.appendChild(this.chartElement.node())
  }

  createChart() {
    const svg: any = d3.create('svg')
    svg
      .attr('width', '100%')
      .attr('height', '100%')
      this.chartElement = svg
  }


  createX(): d3.AxisScale<Date> {
    return d3.scaleUtc()
      .domain(<[Date, Date]>d3.extent(this.data, (d) => d.date))
      .range([this.margin.left, this.width - this.margin.right])
  }


  appendXAxis() {

    const xAxis = (g: any) => {
      g.attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.x).ticks(this.width / (this.width * 0.15) ).tickSizeOuter(0))
      .call((g: any) => g.select('.domain').remove())
    }
    this.chartElement.append('g')
      .call(xAxis)
  }


  createY(): d3.AxisScale<number> {
    return d3.scaleLinear()
    .domain([0, 100]).nice()
    .range([this.height - this.margin.bottom, this.margin.top])
  }


  appendYAxis() {
    const yAxis = (g: any) => {
      g.attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.y).ticks(this.height / (this.height * 0.15)))
      .call((g: any) => g.select('.domain').remove())
      .call((g: any) => g.select(".tick:last-of-type text").append("tspan").text(this.unit))
    }

    this.chartElement.append('g')
    .call(yAxis)

  }


  appendLinearGradientToPath() {
    const color = d3.scaleOrdinal<string>()

    this.chartElement.append('linearGradient')
      .attr("id", this.pathGradient)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", this.height - this.margin.bottom)
      .attr("x2", 0)
      .attr("y2", this.margin.top)
  .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
  .join("stop")
      .attr("offset", d => d )
      .attr("stop-color", d => this.colorFinder(d, [0.3, 0.6, 1]))
  }


  appendLinearGradientToArea() {
    const color = d3.scaleOrdinal<string>()

    this.chartElement.append('linearGradient')
      .attr("id", this.areaGradient)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", this.height - this.margin.bottom)
      .attr("x2", 0)
      .attr("y2", this.margin.top)
  .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
  .join("stop")
      .attr("offset", d => d )
      .attr("stop-color", d => this.colorFinder(d, [0.3, 0.6, 1]))
      .attr("stop-opacity", (d: any) => this.opacityFinder(d, [0.5, 0.9]))
  }

  colorFinder(data: number, stops: number[] = [0.3, 0.6, 1]): string {
    console.log(data);
    for(let i = 0; i < stops.length; i++) {
      if(data <= stops[i]) return this.chartColor[i]
    }
    return this.chartColor[0]
  }

  opacityFinder(data: number, minmax: number[] = [0.6, 0.9]): number {
    if (data < minmax[0]) return minmax[0]
    if (data > minmax[1]) return minmax[1]
    return data
  }


  appendPath() {
    const line: any = d3.line()
      .curve(d3.curveStep)
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => this.x(d.date)!)
      .y((d:any) => this.y(d.value)!)

    this.chartElement.append('path')
    .datum(this.data)
    .attr("fill", "none")
    .attr("stroke", "url(#" + this.pathGradient + ")")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)
  }

  
  appendArea() {
    const area: any = d3.area()
      .curve(d3.curveStep)
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => this.x(d.date)!)
      .y0(this.height - this.margin.bottom)
      .y1((d: any) => this.y(d.value)!)

    this.chartElement.append('path')
    .datum(this.data)
    .attr("fill", "url(#" + this.areaGradient + ")")
    .attr("d", area)
  }
}



