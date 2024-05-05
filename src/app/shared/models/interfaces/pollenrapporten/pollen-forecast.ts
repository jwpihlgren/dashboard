export interface IPollenForecast {
  id: string
  fetchDate: Date
  availableDates: Date[]
  currentDate: Date
  description: string
  regionId: string
  regionName: string
  pollenLevels: { pollenTypeName: string, level: number, levelName: string, time: Date}[]
  issuerName: string
  issuerLink: string
}
