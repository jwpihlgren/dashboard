import { ISMHIObservationsFileType } from './smhi-observations-file-type';
import { ISMHIHydrologicalParameterStationDescription } from './smhi-hydrological-parameter-station-description';
export interface ISMHIHydrologicalParameter {
    key: string
    title: string
    summary: string
    link: ISMHIObservationsFileType[]
    stationSet: any[]
    station: ISMHIHydrologicalParameterStationDescription[]
}
