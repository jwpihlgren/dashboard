import { ISMHIObservationsFileType } from "../../smhi-observations-file-type";

export interface IOceanographicalObservationsStationResponse {
    key: string;
    link: ISMHIObservationsFileType[];
    period: IOceanographicalObservationsStationResponsePeriod[]
    summary: string;
    title: string;
}

export interface IOceanographicalObservationsStationResponsePeriod {
    key: string;
    link: ISMHIObservationsFileType[];
    resource: IOceanographicalObservationsStationResponsePeriod[];
    summary: string;
    title: string;
    updated: number;
}
