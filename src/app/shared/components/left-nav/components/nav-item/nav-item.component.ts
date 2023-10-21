import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ILeftNavItemConfig } from 'src/app/shared/models/interfaces/ileft-nav-item-config';

@Component({
  selector: 'left-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {

 
  @Input() config!: ILeftNavItemConfig

}
