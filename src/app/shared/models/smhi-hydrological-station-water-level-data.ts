import { ISMHIObservationsFileType } from "./smhi-observations-file-type"
import { ISMHIWaterLevelSample } from "./smhi-water-level-sample"

export interface IOceanographicalObservationsDataResponse {
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
    link: ISMHIObservationsFileType[],
    value: ISMHIWaterLevelSample[]
  }