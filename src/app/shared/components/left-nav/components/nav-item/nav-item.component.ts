import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ILeftNavItemConfig } from 'src/app/shared/models/interfaces/ileft-nav-item-config';

@Component({
  selector: 'left-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
  imports: [FontAwesomeModule, RouterLinkActive, RouterLink]
})
export class NavItemComponent {


  @Input() config!: ILeftNavItemConfig

}
