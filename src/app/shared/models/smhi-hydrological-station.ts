import { ISMHIHydrologicalObservationPeriod } from './smhi-hydrological-observation-period';
import { ISMHIObservationsFileType } from './smhi-observations-file-type';

export interface ISMHIHydrologicalStation {
    id: number
    key: string
    name: string
    owner: string
    measuringStations: string
    active: boolean
    latitude: number
    longitude: number
    from: number
    to: number
    region: number
    title: string
    summary: string
    link: ISMHIObservationsFileType[]
    period: ISMHIHydrologicalObservationPeriod[]
}


