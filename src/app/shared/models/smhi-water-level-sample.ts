import { TSMHIObservationsQuality } from "./smhi-observations-quality"

export interface ISMHIWaterLevelSample {
    date: number
    value: number
    quality: TSMHIObservationsQuality
  }