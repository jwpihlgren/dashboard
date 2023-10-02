import { OceanographicalObservationsService } from './../../shared/services/oceanographical-observations.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOceanographicalObservationsDataResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-data-response';
import { IOceanographicalObservationsParameterResponse, IOceanographicalObservationsParameterResponseStation } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-parameter-response';
import { IOceanographicalObservationsPeriodResponse, IOceanographicalObservationsPeriodResponseData } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-period-response';
import { IOceanographicalObservationsStationResponse } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-station-response';
import { IOceanographicalObservationsVersionResponse, IOceanographicalObservationsVersionResponseResource } from 'src/app/shared/models/interfaces/smhi/oceanographical-observations-version-response';
import { ISMHIObservationsFileType } from 'src/app/shared/models/smhi-observations-file-type';

@Component({
  selector: 'app-oceanographical-observations',
  templateUrl: './oceanographical-observations.component.html',
  styleUrls: ['./oceanographical-observations.component.css']
})
export class OceanographicalObservationsComponent implements OnInit {

  constructor(private oceanographicalObservationsService: OceanographicalObservationsService) { }

  APPLICATION_TYPE = "application/json"

  oceanographicalObservationsParameters$?: Observable<IOceanographicalObservationsVersionResponse>
  oceanographicalObservationsStations$?: Observable<IOceanographicalObservationsParameterResponse>
  oceanographicalObservationsStation$?: Observable<IOceanographicalObservationsStationResponse>
  oceanographicalObservationsPeriod$?: Observable<IOceanographicalObservationsPeriodResponse>
  oceanographicalObservationsData$?: Observable<IOceanographicalObservationsDataResponse>

  ngOnInit(): void {
    this.oceanographicalObservationsParameters$ = this.oceanographicalObservationsService.getParameters()
  }

  getStations(resource: IOceanographicalObservationsVersionResponseResource): void {
    this.oceanographicalObservationsStations$ = this.oceanographicalObservationsService.getStations(this.getLinkByMediaType(resource.link))
  }

  resetStations(): void {
    this.oceanographicalObservationsStations$ = undefined
  }

  getStation(station: IOceanographicalObservationsParameterResponseStation): void {
    this.oceanographicalObservationsStation$ = this.oceanographicalObservationsService.getStation(this.getLinkByMediaType(station.link))
  }

  resetStation(): void {
    this.oceanographicalObservationsStation$ = undefined
  }

  getPeriod(period: IOceanographicalObservationsPeriodResponseData): void {
    this.oceanographicalObservationsPeriod$ = this.oceanographicalObservationsService.getPeriod(this.getLinkByMediaType(period.link))
  }

  resetPeriod(): void {
    this.oceanographicalObservationsPeriod$ = undefined
  }


  private getLinkByMediaType(links: ISMHIObservationsFileType[]): string {
    return links.find(link => link.type === this.APPLICATION_TYPE)?.href as string
  }


}


