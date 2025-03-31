import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map, tap } from 'rxjs';
import { PollenForecastComponent } from 'src/app/shared/components/pollen-forecast/pollen-forecast.component';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';
import { IPollenForecast } from 'src/app/shared/models/interfaces/pollenrapporten/pollen-forecast';
import { IPollenRegion, PollenService } from 'src/app/shared/services/pollen.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-pollen-region',
  imports: [ColumnComponent, PollenForecastComponent],
  templateUrl: './pollen-region.component.html',
  styleUrl: './pollen-region.component.css'
})
export class PollenRegionComponent {
  protected pollenService: PollenService = inject(PollenService)
  protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  protected userService: UserService = inject(UserService)

  forecast: Signal<IPollenForecast | undefined>
  region: Signal<string>

  constructor() {
    this.forecast = toSignal(this.pollenService.pollenForecast$.pipe(tap(data => console.log(data))))
    this.region = toSignal(this.activatedRoute.paramMap.pipe(
      map(route => {
        return route.get("id") as string
      })
    ), { initialValue: "" })

    this.pollenService.pollenForecastById(this.region())
  }

  setDefault(region: IPollenRegion): void {
    this.userService.setUserFavoritePollenForecastLoaction(region).pipe(
      first()
    ).subscribe()
  }
}
