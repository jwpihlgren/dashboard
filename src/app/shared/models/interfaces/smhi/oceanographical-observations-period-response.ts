import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IOceanographicalObservationsPeriodResponse {
    data: IOceanographicalObservationsPeriodResponseData[]
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    
}

export interface IOceanographicalObservationsPeriodResponseData {
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
}
