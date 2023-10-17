import { ISMHIObservationsFileType } from "../../smhi-observations-file-type";

export interface IHydrologicalObservationsStationResponse {
    active: boolean;
    from: number;
    id: number;
    key: string;
    latitude: number;
    link: ISMHIObservationsFileType[];
    longitude: number;
    mobile: boolean;
    name: string;
    period: IHydrologicalObservationsStationResponsePeriod[]
    summary: string;
    title: string;
    to: number;
}

export interface IHydrologicalObservationsStationResponsePeriod {
    key: string;
    link: ISMHIObservationsFileType[];
    resource: IHydrologicalObservationsStationResponsePeriod[];
    summary: string;
    title: string;
    updated: number;
}
