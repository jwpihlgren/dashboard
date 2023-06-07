import { IAreaChartData } from "./area-chart-data";

export interface IAreaChartConfig {
    chartColors?: string[],
    unit?: string,
    data: IAreaChartData[]
  }