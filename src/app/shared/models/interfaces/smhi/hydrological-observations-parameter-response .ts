import { ISMHIObservationsFileType } from "../../smhi-observations-file-type"

export interface IHydrologicalObservationsParameterResponse {
    key: string
    link: ISMHIObservationsFileType[]
    station: IHydrologicalObservationsParameterResponseStation[]
    summary: string
    title: string
}

export interface IHydrologicalObservationsParameterResponseStation {
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
}
