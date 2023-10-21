import { Component, OnInit } from '@angular/core';
import { faHouse, faCloudSun, faSeedling, faThLarge, faVial, faWater, } from '@fortawesome/free-solid-svg-icons';
import { INavItem } from '../../models/nav-item';
import { ILeftNavItemConfig } from '../../models/interfaces/ileft-nav-item-config';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  links: INavItem[] = [
    {route: "/", icon: faHouse, title: "Hem"},
    {route: "/dashboard", icon: faThLarge, title: "Dashboard"},
    {route: "/weather", icon: faCloudSun, title: "Sök väder"},
    {route: "/soilmoisture", icon: faSeedling, title: "Sensorer"},
    {route: "/hydrological-observations", icon: faWater, title: "Hydrologi"},
    {route: "/oceanographical-observations", icon: faWater, title: "Oceanografi"},
   /*  {route: "/test", icon: faVial, title: "Test"} */
  ]

  constructor() { }

  ngOnInit(): void {
  }


  createConfig(navItem: INavItem): ILeftNavItemConfig {
    return {
      route: navItem.route,
      icon: navItem.icon,
      size: "lg",
      title: navItem.title,
    }
  }

}

