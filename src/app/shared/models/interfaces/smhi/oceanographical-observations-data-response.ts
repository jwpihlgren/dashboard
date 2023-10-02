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
interface IOceanographicalObservationsDataResponseParameter {}
interface IOceanographicalObservationsDataResponseStation {}
interface IOceanographicalObservationsDataResponsePeriod {}
interface IOceanographicalObservationsDataResponsePosition {}
