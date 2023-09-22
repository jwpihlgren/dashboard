import { SMHIHydrologicalObservationPeriod } from './smhi-hydrological-observation-period';
import { ISMHIHydrologicalObservationsFileType } from './smhi-hydrological-observations-file-type';

export interface ISMHIStationWithPeriods {
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
    link: ISMHIHydrologicalObservationsFileType[]
    period: SMHIHydrologicalObservationPeriod[]
}


