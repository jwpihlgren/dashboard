import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3'
import { area, NumberValue } from 'd3';
import { ISoilMoistureData } from '../../models/soil-moisture-data.interface';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, AfterViewInit {

  
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

  chartId!: string
  
  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
        /* Get the size of the parent and use for responsive chart - does not update on resize */
        this.width = this.elementRef.nativeElement.offsetWidth - this.margin * 1
        this.height = this.elementRef.nativeElement.offsetHeight - this.margin * 2
        this.chartId = this.data[0].sensor

  }

  ngAfterViewInit(): void {
    this.createSvg()
    this.drawArea(this.data)
  }

  areaGradient = (data: any) => {
    const arr = []
    const lastValue = data[data.length - 1].value

    if(lastValue >= 81) {
      arr.push({offset: "0%", opacity: "0.6", color : "#5693e9"})
      arr.push({offset: "40%" , opacity: "0.1", color : "#5693e9"})
      arr.push({offset: "100%" , opacity: "0.1", color : "white"})
    }
    else if(lastValue >= 45) {
      arr.push({offset: "0%", opacity: "0.6", color : "#32d2ac"})
      arr.push({offset: "40%" , opacity: "0.1", color : "#32d2ac"})
      arr.push({offset: "100%" , opacity: "0.1", color : "white"})

    }
    else {
      arr.push({offset: "0%", opacity: "0.6", color : "#f8c03f"})
      arr.push({offset: "40%" , opacity: "0.1", color : "#f8c03f"})
      arr.push({offset: "100%" , opacity: "0.1", color : "white"})
    }
    return arr
  }
  lineGradient = (data: any) => {
    const arr = []
    const maxValue = data[data.length - 1].value
    if(maxValue >= 81) {
      arr.push({offset: "0%", opacity: "1", color : "#5693e9"})
    }
    else if(maxValue >= 45) {
      arr.push({offset: "0%", opacity: "1", color : "#32d2ac"})
    }
    else {
      arr.push({offset: "0%", opacity: "1", color : "#f8c03f"})
    }
    return arr
  }

  createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement).select("svg")
    .attr("width", this.width + this.margin * 1)
    .attr("height", this.height + this.margin * 2)
    .append("g")
    .attr("transform", "translate("+ this.margin *  1.5 + "," +  this.margin + ")")
  }

  drawArea(data: any): void {
    const values: IAreaDatum[] = this.mapToObjectArray(data)
     
    /* 
     * Create a time scale and set the domain (min and max) to the min and max date in the data set
     * Set the range(width of the x axis to be the width of the chart minus margin)
     */
    const x = d3.scaleTime()
    .domain(d3.extent(values, ((d: any) => d.date)) as [number, number])
    .range([0, this.width - this.margin])
    
    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([this.height, 0])

    /* 
     * Append the axis to the svg    
     */
    this.svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "center")
    



  /* 
   * Create a 2D area based on the data
   */
    const area = d3.area()
      .x((d: any) => {
        return x(d.date)
      })
      .y0((d: any) => {return y(d.value)})
      .y1(this.height)
      .curve(d3.curveMonotoneX)
    
    const line = d3.line()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.value))
    .curve(d3.curveMonotoneX)

    


    this.svg.append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', "0%").attr('y1', "0%")
      .attr('x2', "0%").attr('y2', "100%")
      .selectAll('stop')
        .data(this.areaGradient(values))
      .enter().append('stop')
        .attr('offset', (d:any) => d.offset)
        .attr('stop-color', (d:any) => d.color)
        .attr('stop-opacity', (d: any) => d.opacity)

    this.svg.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "0%").attr("y2", "100%")
    .selectAll("stop")
      .data(this.lineGradient(values))
    .enter().append("stop")
      .attr("offset", (d :any) => { console.log(d); return d.offset})
      .attr("stop-color", (d: any) => d.color)

    /*  */ 
    this.svg.append('path')
      .data([values])
      .attr('class', 'area')
      .attr('d', area)

    this.svg.append('path')
      .data([values])
      .attr('class', "line")
      .attr('fill', 'none')
      .attr("stroke", "url(#line-gradient)" )
      .attr('stroke-width', "2")
      .attr('d', line)

    this.svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y)
        .tickSizeOuter(1)
        .tickSizeInner(-(this.width - this.margin))
        .tickPadding(15))
  }
  
      

  private map(value: number, leftMin: number, leftMax: number, rigthMin: number, rightMax: number): number {
    const leftSpan = leftMax - leftMin
    const rightSpan = rightMax - rigthMin

    const valueScaled = (value - leftMin) / leftSpan

    return Math.floor(rigthMin + (valueScaled * rightSpan))
  }


  private mapToObjectArray(data: ISoilMoistureData[]): IAreaDatum[] {
    return data.map((value: ISoilMoistureData): IAreaDatum => {
      return {
        date: new Date(value.updatedAt),
        value: value.value
      }
    })
  }


}

interface IAreaDatum {
  date: Date,
  value: NumberValue
}
