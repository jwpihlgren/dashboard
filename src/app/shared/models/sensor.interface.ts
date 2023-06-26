export interface ISensor {
    _id: string
    alias: string
    name: string
    createdAt: Date
    updatedAt: Date,
    minThreshold: number,
    maxThreshold: number,
}
