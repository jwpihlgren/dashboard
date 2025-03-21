import { Component, Input } from '@angular/core';
import { INavigationItem } from '../../models/interfaces/navigation-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css'],
  imports: [RouterLink]
})
export class NavigationListComponent {

  @Input() navigationItems: INavigationItem[] = []
}


