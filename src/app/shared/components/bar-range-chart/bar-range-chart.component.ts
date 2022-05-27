import { Component, OnInit, ElementRef, Input} from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-bar-range-chart',
  templateUrl: './bar-range-chart.component.html',
  styleUrls: ['./bar-range-chart.component.css']
})
export class BarRangeChartComponent implements OnInit{

  @Input() forecast: any[] = [
    { day: "Mån",   minTemp: -5,  maxTemp: 10 },
    { day: "Tis",   minTemp: 5,   maxTemp: 15 },
    { day: "Ons",   minTemp: -2,  maxTemp: 8 },
    { day: "Tor",   minTemp: 8,   maxTemp: 18 },
    { day: "Fre",   minTemp: 6,   maxTemp: 15 },
    { day: "Lör",   minTemp: 12,  maxTemp: 22 },
    { day: "Sön",   minTemp: 15,  maxTemp: 25 },
  ]

  svg: any;
  margin = 50
  width = 500
  height = 370
  domainMin = -15
  domainMax = 35

  constructor(
    private elementRef: ElementRef,
    ) { }

  ngOnInit(): void {
    
    this.width = this.elementRef.nativeElement.offsetWidth - this.margin * 2
    this.height = this.elementRef.nativeElement.offsetHeight - this.margin * 2
    this.createSvg()
    this.drawBars(this.forecast)
  }

  createSvg(): void {
    this.svg = d3.select('figure#bar')
    .append("svg")
    .attr("width", this.width + this.margin * 2)
    .attr("height", this.height + this.margin * 2)
    .append("g")
    .attr("transform", "translate("+this.margin + "," +  this.margin + ")")
  }

 drawBars(data: any[]): void {

   const x = d3.scaleBand()
   .range([0, this.width])
   .domain(data.map(datum => datum.day))
   .padding(0.7)

   this.svg.append("g")
   .attr("transform", "translate(0," +  this.height + ")")
   .attr("class", "no-grid")
   .call(d3.axisBottom(x))
   .selectAll("text")
   .style("text-anchor", "center")


   const y = d3.scaleLinear()
   .domain([this.domainMin, this.domainMax])
   .range([this.height, 0])


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
   .attr("x", (datum: any) => x(datum.day))
   .attr("y", (datum: any) => y(datum.maxTemp))
   .attr("width", x.bandwidth())
   .attr("height", (datum: any) => (this.height - y(datum.maxTemp)) - (this.height - y(datum.minTemp)) )
   .attr("fill", "#d04a35")
 }

}
