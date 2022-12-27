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
  domainMin = 0
  domainMax = 100
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
        this.height = this.elementRef.nativeElement.offsetHeight - this.margin * 2
        this.createSvg()
        this.drawArea(this.data)
  }

  createSvg(): void {
    this.svg = d3.select('figure#area')
    .append("svg")
    .attr("width", this.width + this.margin * 1)
    .attr("height", this.height + this.margin * 2)
    .append("g")
    .attr("transform", "translate("+ this.margin *  1.5 + "," +  this.margin + ")")
    
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

  
      this.createLinearGradient("#f8c03f", "too-little")
      this.createLinearGradient("#32d2ac", "ok")


      const x = d3.scaleTime()
      .domain([minMax.min, minMax.max])
      .range([0, this.width - this.margin])
      
      this.svg.append("g")
      .attr("transform", "translate(0," +  this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "center")

      const y = d3.scaleLinear()
      .domain([0, 80])
      .range([this.height, 0])

      this.svg.append("g")
      .call(d3.axisLeft(y))

    /*   const linearGradient = this.createLinearGradient("#5693e9", "ok", x, y) */




      const yellowGradientOptions = {
        values: values,
        x: x,
        y: y,
        id: "too-little",
        minThreshold: 0,
        maxThreshold: 29,
        color: "#f8c03f"
      }
      this.appendLinearGradient(yellowGradientOptions )
      const blueGradientOptions = {
        values: values,
        x: x,
        y: y,
        id: "too-much",
        minThreshold: 60,
        maxThreshold: 100,
        color: "#5693e9"
      }
      this.appendLinearGradient(blueGradientOptions )
      const greenGradientOptions = {
        values: values,
        x: x,
        y: y,
        id: "ok",
        minThreshold: 30,
        maxThreshold: 59,
        color: "#32d2ac"
      }
      this.appendLinearGradient(greenGradientOptions )



    }
      

    private mapToObjectArray(data: any): any[] {
      return data.map((value: any) => {
        return {
          date: new Date(value.updatedAt),
          value: value.value
        }
      })
    }

/* private createLinearGradient(color : string, id: string, x: any, y: any): void {
      return this.svg.append("linearGradient")
        .attr("id", id)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(50))
        .attr("x2", 0).attr("y2", y(60))
        .selectAll("stop")
        .data([
          {offset: "0", color : "steelblue"},
          {offset: "29", color : "steelblue"},
          {offset: "30", color : "gray"},
          {offset: "59", color : "gray"},
          {offset: "60", color : "red"},
          {offset: "100", color : "red"}
        ])
        .enter().append("stop")
        .attr("offset", (d: any) => d.offset)
        .attr("stop-color", (d: any) => d.color)

    }
 */
    private createLinearGradient(color: string, id:string) {
      const linearGradient = this.svg.append("defs")
      .append("linearGradient")
      .attr("id",id)
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");
  
      linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", color)
      .style("stop-opacity", 0.6);
      linearGradient.append("stop")
      .attr("offset", "80%")
      .style("stop-color", "white")
      .style("stop-opacity", 0 );

      return linearGradient
    }

    private appendLinearGradient(options: {values: any[], x: any, y: any, id: string, minThreshold: number, maxThreshold: number, color: string}) {
      this.svg.append("path")    
      .datum(options.values)
      .style("fill", `url(#${options.id})`)
      .attr("stroke", options.color)
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x((d: any) => options.x(d.date))
        .y0(options.y(0))
        .y1((d: any) => {
          if(d.value > options.minThreshold && d.value <= options.maxThreshold) return options.y(d.value)
          return options.y(0)
        }).curve(d3.curveMonotoneX)
      )
    }

}
