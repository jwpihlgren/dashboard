import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize, first, map, switchMap } from 'rxjs';
import { PollenForecastComponent } from 'src/app/shared/components/pollen-forecast/pollen-forecast.component';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';
import { IPollenForecast } from 'src/app/shared/models/interfaces/pollenrapporten/pollen-forecast';
import { IPollenRegion, PollenService } from 'src/app/shared/services/pollen.service';
import { UserMetadata, UserService } from 'src/app/shared/services/user.service';

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

  useAsDefault="Använd som standrd"
  loading = "Laddar..."
  setDefaultButtonText: WritableSignal<string> = signal<string>(this.useAsDefault)
  forecast: Signal<IPollenForecast | undefined>
  region: Signal<string>
  metadata: Signal<UserMetadata | undefined> = signal(undefined)
  id: string | undefined
  constructor() {
    this.forecast = toSignal(this.pollenService.pollenForecast$)
    this.region = toSignal(this.activatedRoute.paramMap.pipe(
      map(route => {
        return route.get("id") as string
      })
    ), { initialValue: "" })
    this.pollenService.pollenForecastById(this.region())
    this.metadata = toSignal(this.userService.getUser().pipe(
      switchMap(user => {
        this.id = user?.sub
          return this.userService.getUserMetadata(user?.sub!)
      })
    ))
  }

  setDefault(region: IPollenRegion): void {
    if (this.id && this.metadata()) {
      this.setDefaultButtonText.set(this.loading)
      this.userService.setUserFavoritePollenForecastLoaction(this.id, this.metadata()!, region).pipe(
        first(),
        finalize(() => this.setDefaultButtonText.set(this.useAsDefault))
      ).subscribe((data) => {console.log(data)})
    }
  }
}
