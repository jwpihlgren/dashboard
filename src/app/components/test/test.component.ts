import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPollenForecast } from 'src/app/shared/models/interfaces/pollenrapporten/pollen-forecast';
import { PollenService } from 'src/app/shared/services/pollen.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  REGION = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38"
  constructor(private pollenService: PollenService) { }

  forecast$!: Observable<IPollenForecast>
  ngOnInit(): void {
    this.forecast$ = this.pollenService.detailedForecast(this.REGION).pipe(
      tap(data => console.log(data))
    )
  }

  updateData(date: any): void {
    this.forecast$ = this.pollenService.detailedForecast(this.REGION, date).pipe(
      tap(data => console.log(data))
    )
  }


}
