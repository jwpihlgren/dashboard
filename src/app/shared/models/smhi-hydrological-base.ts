import { ISMHIHydrologicalObservationsFileType } from './smhi-hydrological-observations-file-type';
import { ISMHIHydrologicalStation } from './smhi-hydrological-station';
export interface ISMHIHydrologicalBase {
    key: string
    title: string
    summary: string
    link: ISMHIHydrologicalObservationsFileType[]
    stationSet: any[]
    station: ISMHIHydrologicalStation[]
}
