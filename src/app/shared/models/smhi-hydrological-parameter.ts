import { ISMHIHydrologicalObservationsFileType } from './smhi-hydrological-observations-file-type';
import { ISMHIHydrologicalParameterStationDescription } from './smhi-hydrological-parameter-station-description';
export interface ISMHIHydrologicalParameter {
    key: string
    title: string
    summary: string
    link: ISMHIHydrologicalObservationsFileType[]
    stationSet: any[]
    station: ISMHIHydrologicalParameterStationDescription[]
}
