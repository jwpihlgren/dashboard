import { ILocation } from './../../models/location.interface';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResult!: ILocation

  

  constructor() { }

  ngOnInit(): void {
  }

  @Output() clickRequest: EventEmitter<any> = new EventEmitter()

  @HostListener('click') 
  onClick(): void {
    this.clickRequest.emit(this.searchResult)
  }

}
