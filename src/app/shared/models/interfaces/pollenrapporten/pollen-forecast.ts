export interface IPollenForecast {
  id: string
  fetchDate: Date
  availableDates: {id: number, date: Date}[]
  currentDate: Date
  shortDescription: string
  description: string | undefined
  regionId: string
  regionName: string
  pollenLevels: { pollenTypeName: string, level: number, levelName: string, time: Date}[]
  issuerName: string
  issuerLink: string
}
