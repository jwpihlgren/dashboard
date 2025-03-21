import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PollenForecastComponent } from 'src/app/shared/components/pollen-forecast/pollen-forecast.component';
import { MasonryGridComponent } from 'src/app/shared/layouts/masonry-grid/masonry-grid.component';
import { IPollenForecast } from 'src/app/shared/models/interfaces/pollenrapporten/pollen-forecast';
import { PollenService } from 'src/app/shared/services/pollen.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [PollenForecastComponent, MasonryGridComponent]
})
export class TestComponent implements OnInit {

  REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38"
  constructor(private pollenService: PollenService) { }

  forecast$!: Observable<IPollenForecast>
  ngOnInit(): void {
  }

  updateData(date: any): void {
  }


}
