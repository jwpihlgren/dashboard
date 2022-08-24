import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Observable, mergeMap, tap, finalize, } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';
import { ILocation } from '../../models/location.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private locationService:LocationService,
    private weatherService: WeatherService
  ) { }


  @ViewChild("search") elementRef!: ElementRef
  searchQuery: string = ""
  searchResults$!: Observable<ILocation[]>;

  searchHasFocus: boolean = false
  searchIsPristine: boolean = true

  forecastIsLoading: boolean = false

  forecast$!: Observable<any>

  faTimes = faTimes
  faSearch = faSearch
  
  ngOnInit(): void {}

  updateSearchQuery(event: any): void {
    this.searchQuery = event.target.value
    if(this.searchQuery === "") return
    this.searchResults$ = this.getLocation(this.searchQuery)
    this.searchIsPristine = this.searchQuery === "" ? true : false
  }

  clearSearchQuery(): void {
    this.searchQuery = ""
    this.searchResults$ = new Observable
    this.searchIsPristine = true
    this.elementRef.nativeElement.value = this.searchQuery
    this.elementRef.nativeElement.focus()
  }

  setSearchFocus(){
    this.searchHasFocus = true
  }
  clearSearchFocus(){
    this.searchHasFocus = false
  }

  private getLocation(searchQuery: string): Observable<any> {
    return this.locationService.getWeatherLocation(searchQuery)
  }

  private getForecast(location: ILocation): void {
    this.forecast$ = this.weatherService.getForecast(location).pipe(
      finalize(() => this.forecastIsLoading = false)
    )
  }
 
  onSearchClickHandler() {
    this.forecastIsLoading = true;
    this.getLocation(this.searchQuery).pipe(
      mergeMap((locations: ILocation[]): any => {
        if(locations.length === 0) {
          return undefined
        }
        this.getForecast(locations[0])
      })
    )
    this.clearSearchQuery()
  }

  onResultClickHandler(location: ILocation) {
    this.forecastIsLoading = true;
    this.getForecast(location)
    this.clearSearchQuery()
  }
    


}
