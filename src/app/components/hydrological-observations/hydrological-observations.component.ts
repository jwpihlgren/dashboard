import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';


@Component({
  selector: 'app-hydrological-observations',
  templateUrl: './hydrological-observations.component.html',
  styleUrls: ['./hydrological-observations.component.css'],
  imports: [RouterOutlet, ColumnComponent]
})
export class HydrologicalObservationsComponent {
}


