import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  imports: [RouterLink]
})
export class LogoComponent implements OnInit {

  logoPath: string = "./assets/logo.svg#logo-rounded"
  logoHref: string ="/"
  constructor() { }

  ngOnInit(): void {
  }

}
