import { ISMHIObservationsFileType } from "./smhi-observations-file-type"

export interface ISMHIHydrologicalObservationPeriod {
    key: "corrected-archive" | "latest-hour" | "latest-day" | "latest-months"
    updated: number
    title: string
    summary: string
    link: ISMHIObservationsFileType[]
}
