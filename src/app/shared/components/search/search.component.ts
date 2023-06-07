import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';
import { ILocation } from '../../models/location.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild("search") elementRef!: ElementRef
 
  @Input() searchResults: ILocation[] = []
  @Input() isLoading: boolean = false
 
  @Output() requestLocationSearch: EventEmitter<string> = new EventEmitter()
  @Output() resultClicked: EventEmitter<ILocation> = new EventEmitter()
  @Output() focusChange: EventEmitter<boolean> = new EventEmitter()

  searchQuery: string = ""
  searchHasFocus: boolean = false
  searchIsPristine: boolean = true

  faTimes = faTimes
  faSearch = faSearch

  constructor(
    ) { }

  onSearchKeyUpHandler(event: any): void {
    this.searchQuery = event.target.value
    this.searchIsPristine = this.searchQuery === ""
    if(this.searchQuery !== "") this.requestLocationSearch.emit(this.searchQuery)
  }

  clearSearchQuery(): void {
    this.searchQuery = ""
    this.searchResults = []
    this.searchIsPristine = true
    this.elementRef.nativeElement.value = this.searchQuery
    this.elementRef.nativeElement.focus()
    this.setSearchFocus()
  }

  setSearchFocus(){
    this.searchHasFocus = true
    this.focusChange.emit(this.searchHasFocus)
  }
  clearSearchFocus(){
    this.searchHasFocus = false
    this.focusChange.emit(this.searchHasFocus)
  }


  onSearchClickHandler() {
    this.resultClicked.emit(this.searchResults[0])
    this.clearSearchQuery()
    this.clearSearchFocus()
  }

  onResultClickHandler(location: ILocation) {
    this.resultClicked.emit(location)
    this.clearSearchQuery()
    this.clearSearchFocus()
  }
    


}
