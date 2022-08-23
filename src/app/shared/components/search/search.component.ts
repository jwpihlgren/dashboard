import { LocationService } from './../../services/location.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  constructor(
    private locationService:LocationService
  ) { }


  @ViewChild("search") elementRef!: ElementRef
  searchQuery: string = ""
  searchResults$!: Observable<any>;
  searchHasFocus: boolean = false
  searchIsPristine: boolean = true
  faTimes = faTimes
  faSearch = faSearch
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.elementRef.nativeElement)
  }

  updateSearchQuery(event: any): void {
    this.searchQuery = event.target.value
    this.searchResults$ = this.locationService.getWeatherLocation(this.searchQuery)
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
    


}
