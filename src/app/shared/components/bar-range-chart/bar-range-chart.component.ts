import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, ElementRef, Input, AfterViewChecked, AfterViewInit, HostListener, ViewChild, HostBinding, OnChanges, KeyValueDifferFactory, KeyValueDiffers} from '@angular/core';
import * as d3 from 'd3'
import { IForecastDaily } from '../../models/forecast-response.interface';


@Component({
  selector: 'app-bar-range-chart',
  templateUrl: './bar-range-chart.component.html',
  styleUrls: ['./bar-range-chart.component.css']
})
export class BarRangeChartComponent implements OnInit, OnChanges{

  @Input() forecast!: IForecastDaily[]

  svg: any;
  width!: number
  height!: number

  margin =  {top: 20, right: 30, bottom: 30, left: 40}
  parentPadding = 16
  yTickHeight = 66
  yTickOffset =  this.yTickHeight
  domainMin = -15
  domainMax = 35
  domainPadding = 5

  differ: any

  constructor(
    private elementRef: ElementRef,
    private weatherService: WeatherService,
    private differs: KeyValueDiffers
    ) { 
      this.differ = differs.find({}).create()
    }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth
    
    const [currentMin, currentMax]: number[] = this.forecast.reduce((acc: number[], day: IForecastDaily) => {
      return [Math.min(acc[0], day.minTemperature), Math.max(acc[1], day.maxTemperature)]
    }, [Infinity, -Infinity])
    this.domainMin =  currentMin - Math.min(((currentMax - currentMin) / 1),  this.domainPadding)
    this.domainMax =  currentMax + Math.min(((currentMax - currentMin) / 1),  this.domainPadding)
    this.createChart()
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.forecast)
    if(changes) {
      this.deleteChart()
      this.createChart()
      this.drawBars(this.forecast)
    }
  }

  ngOnChanges(event: any): void {
    if(this.svg){
      let dirty: boolean = false;
      if(this.svg.node().getBoundingClientRect().width !== this.width) {
        this.width = this.svg.node().getBoundingClientRect().width
        dirty = true
      }
      if(this.svg.node().getBoundingClientRect().height !== this.height) {
        this.height = this.svg.node().getBoundingClientRect().height
        dirty = true
      }
      if(dirty) {
        this.deleteChart()
        this.createChart()
        this.drawBars(this.forecast)
      }
    }
  }

  createChart(){
    this.svg = d3.select('#bar')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
  }

  drawBars(data: IForecastDaily[]): void {

    const x = d3.scaleBand()
    .domain(data.map((datum: IForecastDaily) => datum.validTime.toString()))
    .range([this.margin.left, this.width - this.margin.right])
    .padding(0.7)

    const y = d3.scaleLinear()
    .domain([this.domainMin, this.domainMax])
    .range([this.height - this.yTickOffset - this.margin.top, 0])
    .nice()
 
    const ticklabels: string[] = ["SÖN","MÅN","TIS","ONS","TOR","FRE","LÖR",]
 
    this.svg.append("g")
    .attr("transform", "translate(0," +  (this.height - this.yTickHeight) + ")")
    .attr("class", "no-grid")
    .call(d3.axisBottom(x).tickFormat((d: any,i: any) => {return ticklabels[new Date(d).getDay()]}))
    .selectAll("text")
    .style("text-anchor", "center")
    

    const yGrid = d3.axisLeft(y)
    .tickSize(this.width - (this.margin.left * 2))
    .ticks(5)
    
    this.svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate("+ (this.width - (this.margin.left * 0.75)) +","+ this.margin.top+")")
    .call(yGrid)
 

   
 
    /* Draw the bars */
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (datum: IForecastDaily) => x(datum.validTime.toString()))
    .attr("y", (datum: IForecastDaily) => y(datum.maxTemperature))
    .attr("width", x.bandwidth())
    .attr("height", 8 )
    .attr("fill", "#d04a35")
    .transition()
    .duration(1500)
    .attr("height", (datum: IForecastDaily) => ((this.height - this.yTickOffset) - y(datum.maxTemperature)) - ((this.height - this.yTickOffset) - y(datum.minTemperature)) )
    .attr("transform", "translate(0," + (this.margin.top) + ")")


    /* Add the weather icons to each tick */
    const selection = this.svg.selectAll(".tick");
    selection._groups[0].forEach((node: any, index: number) => {
      if(!data[index]) return
      d3.select(node)
      .append('svg')
      .attr('class', 'icon daily-icon')
      .attr('x',-12)
      .attr('y', 24)
      .attr('width', 24)
      .attr('height', 24)
      .append('use')
       .attr('xlink:href', this.weatherService.getIconUrl(data[index].symbol))
    })
  }


  deleteChart() {
    this.svg?.remove()
  }

  
}

 