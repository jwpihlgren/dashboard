import { TSMHIObservationsQuality } from '../../smhi-observations-quality';
import { ISMHIObservationsFileType } from './../../smhi-observations-file-type';
export interface IHydrologicalObservationsDataResponse {
    value: IHydrologicalObservationsDataResponseValue[]
    updated: number
    parameter: IHydrologicalObservationsDataResponseParameter
    station: IHydrologicalObservationsDataResponseStation
    period: IHydrologicalObservationsDataResponsePeriod
    position: IHydrologicalObservationsDataResponsePosition[]
    link: ISMHIObservationsFileType[]
}


interface IHydrologicalObservationsDataResponseValue {
    date: number
    value: number
    quality: TSMHIObservationsQuality
}

interface IHydrologicalObservationsDataResponseParameter {
    key: string
    name: string
    unit: string
}

interface IHydrologicalObservationsDataResponseStation {
    key: string
    name: string
    owner: string
}

interface IHydrologicalObservationsDataResponsePeriod {
    key: string
    from: number
    to: number
    summary: string
}
interface IHydrologicalObservationsDataResponsePosition {
    from: number
    to: number
    latitude: number
    longitude: number
}
