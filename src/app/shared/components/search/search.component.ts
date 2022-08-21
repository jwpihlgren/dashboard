import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

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
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.elementRef.nativeElement); 
  }

  updateSearchQuery(event: any): void {
    this.searchQuery = event.target.value
  }

  clearSearchQuery(): void {
    this.searchQuery = ""
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
