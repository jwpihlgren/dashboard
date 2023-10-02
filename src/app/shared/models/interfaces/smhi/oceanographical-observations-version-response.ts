import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IOceanographicalObservationsVersionResponse {
    key: string
    link: ISMHIObservationsFileType[]
    resource: IOceanographicalObservationsVersionResponseResource[]
    summary: string
    title: string
    updated: number
}

export interface IOceanographicalObservationsVersionResponseResource {
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
}