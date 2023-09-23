import { ISMHIHydrologicalObservationsFileType } from "./smhi-hydrological-observations-file-type"
import { ISMHIWaterLevelSample } from "./smhi-water-level-sample"

export interface ISMHIHydrologicalStationWaterLevelData {
    updated: number
    parameter: {
      key: string
      name: string
      unit: string
    },
    station: {
      key: string
      name: string
      owner: string
      measuringStations: string
    },
    period: {
      key: string
      from: number
      to: number
      summary: string
    },
    link: ISMHIHydrologicalObservationsFileType[],
    value: ISMHIWaterLevelSample[]
  }