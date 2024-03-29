import { Component, OnInit } from '@angular/core';
import { ILink } from 'src/app/shared/models/ilink';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  links: ILink[] = [
    {href: 'https://jwpihlgren.github.io/pmdb/', name: "Pihlgren Movie Database"},
    {href: 'https://jwpihlgren.github.io/weather-app/', name: "Weather App (Legacy)"},
    {href: 'https://jwpihlgren.github.io/', name: "Portfolio"},
  ]

  ngOnInit(): void {
  }
}

