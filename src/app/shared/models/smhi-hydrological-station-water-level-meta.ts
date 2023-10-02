import { ISMHIObservationsFileType } from './smhi-observations-file-type';
import { ISMHIHydrologicalObservationPeriod } from "./smhi-hydrological-observation-period"

export interface ISMHIHydrologicalStationWaterLevelMeta {
    data: ISMHIHydrologicalObservationStationMetaData[]
    key: ISMHIHydrologicalObservationPeriod
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
}

interface ISMHIHydrologicalObservationStationMetaData {
    key: string
    link: ISMHIObservationsFileType[]
    summary: string
    title: string
    updated: number
}
