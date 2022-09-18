import { Component, Inject, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() name: string = ""

  isMenuOpen: boolean = false


  toggleMenu(){
    console.log("click");
    console.log(this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen
    console.log(this.isMenuOpen);
  }

  clickedOutside() {
    this.isMenuOpen = false
  }

}
