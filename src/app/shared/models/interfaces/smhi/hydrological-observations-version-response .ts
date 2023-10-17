import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IHydrologicalObservationsVersionResponse {
    key: string
    link: ISMHIObservationsFileType[]
    resource: IHydrologicalObservationsVersionResponseResource[]
    summary: string
    title: string
    updated: number
}

export interface IHydrologicalObservationsVersionResponseResource {
    geobox: {
        maxLatitude: number
        maxLongitude: number
        minLatitude: number
        minLongitude: number
    }
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
    unit: string
}