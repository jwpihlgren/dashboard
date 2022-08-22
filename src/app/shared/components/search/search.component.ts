import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  constructor() { }


  @ViewChild("search") elementRef!: ElementRef
  searchQuery: string = ""
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
    this.searchIsPristine = this.searchQuery === "" ? true : false
    console.log(this.searchIsPristine);
  }

  clearSearchQuery(): void {
    this.searchQuery = ""
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
