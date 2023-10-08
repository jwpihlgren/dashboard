import { ISMHIObservationsFileType } from "./smhi-observations-file-type"

export interface ISMHIHydrologicalParameterStationDescription {
    key: string
    updated: number
    title: string
    summary: string
    link: ISMHIObservationsFileType[]
    name: string
    id: number
    owner: string
    measuringStations: string
    active: boolean
    from: number
    to: number
    latitude: number
    longitude: number
    region: number
  }

