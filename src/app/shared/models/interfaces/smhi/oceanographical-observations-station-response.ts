import { ISMHIObservationsFileType } from "../../smhi-observations-file-type";

export interface IOceanographicalObservationsStationResponse {
    active: boolean;
    from: number;
    id: number;
    key: string;
    latitude: number;
    link: ISMHIObservationsFileType[];
    longitude: number;
    mobile: boolean;
    name: string;
    period: IOceanographicalObservationsStationResponsePeriod[]
    summary: string;
    title: string;
    to: number;
}

export interface IOceanographicalObservationsStationResponsePeriod {
    key: string;
    link: ISMHIObservationsFileType[];
    resource: IOceanographicalObservationsStationResponsePeriod[];
    summary: string;
    title: string;
    updated: number;
}
