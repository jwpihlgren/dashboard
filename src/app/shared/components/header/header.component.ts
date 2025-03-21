import { Component, OnInit } from '@angular/core';
import { UserMenuItemComponent } from '../user-menu-item/user-menu-item.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [UserMenuItemComponent, LogoComponent]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
