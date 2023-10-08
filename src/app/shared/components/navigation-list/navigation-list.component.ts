import { Component, Input } from '@angular/core';
import { INavigationItem } from '../../models/interfaces/navigation-item';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css']
})
export class NavigationListComponent {

  @Input() navigationItems: INavigationItem[] = []
}


