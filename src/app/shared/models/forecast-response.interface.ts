export interface IForecastResponse {
    current: IForecastCurrent,
    hourly: IForecastHourly[]
    daily: IForecastDaily[
    ]
    updatedAt: Date
}


 export interface IForecastCurrent {
    windSpeed: number
    windGust: number
    windDirection: number
    airPressure: number
    humidity: number
    precipitationType: 0 | 1 | 2 | 3 | 4 | 5 | 6
    minAmountOfPrecipitation: number
    maxAmountOfPrecipitation: number
    currentTemperature: number
    apparentTemperature: number
    symbol: number
}


export interface IForecastHourly {
    validTime: Date
    currentTemperature: number
    apparentTemperature: number
    UVI: number
    precipitationType: 0 | 1 | 2 | 3 | 4 | 5 | 6
    minAmountOfPrecipitation: number
    maxAmountOfPrecipitation: number
    cloudiness: number
    symbol: number
}
export interface IForecastDaily {
    validTime: Date,
    minTemperature: number
    maxTemperature: number
    symbol: number
}
