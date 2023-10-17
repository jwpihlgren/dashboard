import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IHydrologicalObservationsPeriodResponse {
    data: IHydrologicalObservationsPeriodResponseData[]
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    
}

export interface IHydrologicalObservationsPeriodResponseData {
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
}
