import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  
  @Input() data: any = []

  svg: any;
  margin = 25
  width = 500
  height = 370
  domainMin = -15
  domainMax = 35
  domainPadding = 10;
  sv_SE = {
    decimal: ",",
    thousands: " ",
    grouping: [3],
    currency: ["kr", "sek"],
    dateTime: "%Y-%m-%d %H:%M:%S",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["",""],
    days: ["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"],
    shortDays: ["Mån","Tis","Ons","Tor","Fre","Lör","Sön"],
    months: ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],
    shortMonths: ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
  }
  
  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
        /* Get the size of the parent and use for responsive chart - does not update on resize */
        this.width = this.elementRef.nativeElement.offsetWidth - this.margin * 1
        this.height = this.elementRef.nativeElement.offsetHeight - this.margin * 2.5
        this.createSvg()
        this.drawArea(this.data)
  }

  createSvg(): void {
    this.svg = d3.select('figure#area')
    .append("svg")
    .attr("width", this.width + this.margin * 1)
    .attr("height", this.height + this.margin * 2)
    .append("g")
    .attr("transform", "translate("+ this.margin / 1 + "," +  this.margin + ")")
    
  }

  


  drawArea(data: any): void {
    const values = this.mapToObjectArray(data)
    const minMax = values.reduce(
      (acc: any, cur: any) => {
        return {
          min: Math.min(cur.date, acc.min),
          max: Math.max(cur.date, acc.max)
        }
      }, 
      {
        min: values[0].date,
        max: values[0].date
      }
    )

   const linearGradient = this.svg.append("defs")
    .append("linearGradient")
    .attr("id","areaGradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "0%").attr("y2", "100%");

    linearGradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#32d2ac")
    .style("stop-opacity", 0.6);
    linearGradient.append("stop")
    .attr("offset", "80%")
    .style("stop-color", "white")
    .style("stop-opacity", 0);

      const x = d3.scaleTime()
      .domain([minMax.min, minMax.max])
      .range([0, this.width])
      
      this.svg.append("g")
      .attr("transform", "translate(0," +  this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "center")

      const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0])

      this.svg.append("g")
      .call(d3.axisLeft(y))

      this.svg.append("path")    
      .datum(values)
      .style("fill", "url(#areaGradient)")
      .attr("stroke", "#32d2ac")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x((d: any) => x(d.date))
        .y0(y(0))
        .y1((d: any) => y(d.value)).curve(d3.curveMonotoneX)
        )
    }
      

      private mapToObjectArray(data: any): any[] {
        return data.values.map((value: any) => {
          return {
            date: new Date(value.date),
            value: value.value
          }
        })
      }
}

interface ISensorValue {
  _id: string,
  value: number,
  date: string
}
