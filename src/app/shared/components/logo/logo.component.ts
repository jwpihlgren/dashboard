import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  logoPath: string = "../../../../assets/logo.svg#logo-rounded"
  logoHref: string ="/"
  constructor() { }

  ngOnInit(): void {
  }

}
