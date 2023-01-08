import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, ElementRef, Input, AfterViewChecked, AfterViewInit, HostListener} from '@angular/core';
import * as d3 from 'd3'
import { IForecastDaily } from '../../models/forecast-response.interface';


@Component({
  selector: 'app-bar-range-chart',
  templateUrl: './bar-range-chart.component.html',
  styleUrls: ['./bar-range-chart.component.css']
})
export class BarRangeChartComponent implements OnInit, AfterViewInit{

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
  }

  @Input() forecast: IForecastDaily[] = [
    { validTime: new Date(new Date().setDate( new Date().getDate() + 0)),   minTemperature: -5,  maxTemperature: 10, symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 1)),   minTemperature: 5,   maxTemperature: 15, symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 2)),   minTemperature: -2,  maxTemperature: 8,  symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 3)),   minTemperature: 8,   maxTemperature: 18, symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 4)),   minTemperature: 6,   maxTemperature: 15, symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 5)),   minTemperature: 12,  maxTemperature: 22, symbol: 1 },
    { validTime: new Date(new Date().setDate( new Date().getDate() + 6)),   minTemperature: 15,  maxTemperature: 25, symbol: 1 },
  ]

  svg: any;
  margin = 50
  width!: number
  height!: number
  domainMin = -15
  domainMax = 35
  domainPadding = 5

  constructor(
    private elementRef: ElementRef,
    private weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    
    /* Get the size of the parent and use for responsive chart - does not update on resize */
    this.width = this.elementRef.nativeElement.offsetWidth - this.margin * 1
    this.height = this.elementRef.nativeElement.offsetHeight - this.margin * 2

    /*Set the domain min/max to the lowest and highest temperature respectively plus some padding*/
    const currentMin = this.forecast.reduce((acc, cur) => Math.min(cur.minTemperature, acc), this.forecast[0].minTemperature)
    const currentMax = this.forecast.reduce((acc, cur) => Math.max(cur.maxTemperature, acc), this.forecast[0].maxTemperature)
    this.domainMin =  currentMin - Math.min(((currentMax - currentMin) / 1),  this.domainPadding)
    this.domainMax =  currentMax + Math.min(((currentMax - currentMin) / 1),  this.domainPadding)

    this.createSvg()
    this.drawBars(this.forecast)
  }

  ngAfterViewInit(): void {

  }

  createSvg(): void {
    this.svg = d3.select('figure#bar')
    .append("svg")
    .attr("width", this.width + this.margin * 1)
    .attr("height", this.height + this.margin * 2)
    .attr("viewBox", "0 0 " + (this.width + this.margin * 1) + " " + (this.height + this.margin * 2) )
    .append("g")
    .attr("transform", "translate("+ this.margin / 1.5 + "," +  this.margin / 2 + ")")
  }

 drawBars(data: IForecastDaily[]): void {

   const x = d3.scaleBand()
   .range([0, this.width])
   .domain(data.map((datum: IForecastDaily) => datum.validTime.toString()))
   .padding(0.7)

   const ticklabels: string[] = ["SÖN","MÅN","TIS","ONS","TOR","FRE","LÖR",]

   this.svg.append("g")
   .attr("transform", "translate(0," +  (this.height + this.margin * 0.25) + ")")
   .attr("class", "no-grid")
   .call(d3.axisBottom(x).tickFormat((d: any,i: any) => {return ticklabels[new Date(d).getDay()]}))
   .selectAll("text")
   .style("text-anchor", "center")
   
  const selection = this.svg.selectAll(".tick");
  selection._groups[0].forEach((node: any, index: number) => {
    d3.select(node)
    .append('svg')
    .attr('class', 'icon daily-icon')
    .attr('x',-20)
    .attr('y', 20)
    .attr('viewbox', '0 0 40 40')
    .attr('width', 40)
    .attr('height', 40)
  } )

  this.svg.selectAll(".daily-icon")._groups[0].forEach((node: any, index: number) => {
    d3.select(node)
    .append('use')
    .attr('xlink:href', this.weatherService.getIconUrl(data[index].symbol))
  })


   const y = d3.scaleLinear()
   .domain([this.domainMin, this.domainMax])
   .range([this.height + this.margin * 0.25, 0])


   this.svg.append("g")
   .attr("class", "grid")
   .attr("transform", "translate("+ this.width +",0)")
   .call(d3.axisLeft(y))

   const yGrid = d3.axisLeft(y)
   .tickSize(this.width)
  
   yGrid(d3.select("g.grid"))

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
   .attr("height", (datum: IForecastDaily) => (this.height - y(datum.maxTemperature)) - (this.height - y(datum.minTemperature)) )
 }

}
