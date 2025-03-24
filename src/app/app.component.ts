import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftNavComponent } from './shared/components/left-nav/left-nav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DateFnsModule } from 'ngx-date-fns';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, LeftNavComponent, HeaderComponent, DateFnsModule]
})
export class AppComponent {
  title = 'dashboard';

  constructor() {}
}
