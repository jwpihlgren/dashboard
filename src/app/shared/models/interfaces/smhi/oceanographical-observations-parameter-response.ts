import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IOceanographicalObservationsParameterResponse {
    key: string
    link: ISMHIObservationsFileType[]
    station: IOceanographicalObservationsParameterResponseStation[]
    summary: string
    title: string
}

export interface IOceanographicalObservationsParameterResponseStation {
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
}
