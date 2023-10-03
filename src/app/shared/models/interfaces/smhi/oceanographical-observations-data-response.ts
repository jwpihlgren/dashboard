import { TSMHIObservationsQuality } from '../../smhi-observations-quality';
import { ISMHIObservationsFileType } from './../../smhi-observations-file-type';
export interface IOceanographicalObservationsDataResponse {
    value: IOceanographicalObservationsDataResponseValue[]
    updated: number
    parameter: IOceanographicalObservationsDataResponseParameter
    station: IOceanographicalObservationsDataResponseStation
    period: IOceanographicalObservationsDataResponsePeriod
    position: IOceanographicalObservationsDataResponsePosition[]
    link: ISMHIObservationsFileType[]
}


interface IOceanographicalObservationsDataResponseValue {
    date: number
    value: number
    quality: TSMHIObservationsQuality
}

interface IOceanographicalObservationsDataResponseParameter {
    key: string
    name: string
    unit: string
}

interface IOceanographicalObservationsDataResponseStation {
    key: string
    name: string
}

interface IOceanographicalObservationsDataResponsePeriod {
    key: string
    from: number
    to: number
    summary: string
}
interface IOceanographicalObservationsDataResponsePosition {
    from: number
    to: number
    latitude: number
    longitude: number
}
