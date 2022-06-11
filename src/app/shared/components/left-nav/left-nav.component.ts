import { Component, OnInit } from '@angular/core';
import { faHouse, faCloudSun, faSeedling, faThLarge } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  links = [
    {route: "/", icon: faHouse},
    {route: "/dashboard", icon: faThLarge},
    {route: "/weather", icon: faCloudSun},
    {route: "/soilmoisture", icon: faSeedling}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
