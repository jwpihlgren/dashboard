import { ISoilMoistureData } from "./soil-moisture-data.interface"

export interface ISensor {
    _id: string,
    alias: string,
    createdAt: Date,
    updatedAt: Date
}
