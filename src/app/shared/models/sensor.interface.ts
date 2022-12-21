import { ISoilMoistureData } from "./soil-moisture-data.interface"

export interface ISensor {
    _id: string,
    alias: string,
    measurements: ISoilMoistureData[]
    interfaceType: "ISensor"
}
