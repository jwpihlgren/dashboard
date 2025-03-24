import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';


@Component({
  selector: 'app-oceanographical-observations',
  templateUrl: './oceanographical-observations.component.html',
  styleUrls: ['./oceanographical-observations.component.css'],
  imports: [RouterOutlet, ColumnComponent]
})
export class OceanographicalObservationsComponent {
}


