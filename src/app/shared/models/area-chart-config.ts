import { IAreaChartData } from "./area-chart-data";

export interface IAreaChartConfig {
    chartColors?: string[],
    unit?: string,
    data: IAreaChartData[],
    domain: number[],
    thresholds?: number[]
    margins?: {top: number, right: number, bottom: number, left: number}
  }