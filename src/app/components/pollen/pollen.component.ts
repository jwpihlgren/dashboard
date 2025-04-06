import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationListComponent } from 'src/app/shared/components/navigation-list/navigation-list.component';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';
import { INavigationItem } from 'src/app/shared/models/interfaces/navigation-item';
import { IPollenRegion, PollenService } from 'src/app/shared/services/pollen.service';

@Component({
  selector: 'app-pollen',
  imports: [ColumnComponent, NavigationListComponent],
  templateUrl: './pollen.component.html',
  styleUrl: './pollen.component.css'
})
export class PollenComponent {

  PollenService: PollenService = inject(PollenService)
  regions: Signal<IPollenRegion[] | undefined>

  constructor(){
    this.regions = toSignal(this.PollenService.getPollenRegions())
  }

  createNavigationItems(regions: IPollenRegion[]): INavigationItem[]{
    return regions.map(region => {
      const nav: INavigationItem = {
        link: [".","region",region.id],
        title: region.name
      }
      return nav
    })
  }
}
