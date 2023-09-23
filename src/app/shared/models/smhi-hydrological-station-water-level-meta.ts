import { ISMHIHydrologicalObservationsFileType } from './smhi-hydrological-observations-file-type';
import { ISMHIHydrologicalObservationPeriod } from "./smhi-hydrological-observation-period"

export interface ISMHIHydrologicalStationWaterLevelMeta {
    data: ISMHIHydrologicalObservationStationMetaData[]
    key: ISMHIHydrologicalObservationPeriod
    link: ISMHIHydrologicalObservationsFileType[]
    summary: string
    title: string
}

interface ISMHIHydrologicalObservationStationMetaData {
    key: string
    link: ISMHIHydrologicalObservationsFileType[]
    summary: string
    title: string
    updated: number
}
