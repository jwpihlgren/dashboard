import { Component, OnInit } from '@angular/core';
import { faHouse, faGauge } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {


  faHouse = faHouse
  faGauge = faGauge
  constructor() { }

  ngOnInit(): void {
  }

}
