import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export interface ILeftNavItemConfig {
    icon:  IconDefinition
    size: SizeProp
    title: string
    route: string
  }
