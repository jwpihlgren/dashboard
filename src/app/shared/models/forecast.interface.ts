import { IForecastResponse } from "./forecast-response.interface";

export interface IForecast extends IForecastResponse {
    locationName: string
    fetchDate: Date
    expireDate:Date

}
