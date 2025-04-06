import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-menu-item',
  templateUrl: './user-menu-item.component.html',
  styleUrls: ['./user-menu-item.component.css'],
  imports: [FontAwesomeModule, MenuItemComponent, RouterLink]
})
export class UserMenuItemComponent {

  protected userService: UserService = inject(UserService)
  protected authService: AuthService = inject(AuthService)
  user = toSignal(this.userService.getUser())
  isAuthenticated = toSignal(this.authService.isAuthenticated$)

  loginIcon: any = faRightToBracket;
  buttonGroup = {
    profile: { icon: faUser, title: "Profil" },
    logout: { icon: faSignOut, title: "Logga ut" },
    login: { icon: faSignIn, title: "Logga in" }
  }

  constructor(
    @Inject(DOCUMENT) public document: Document

  ) { }

   loginWithRedirect(event: Event) {
    event.preventDefault();
    console.log("test");
    this.userService.login()
  }

  logout() {
    this.userService.logout()
    }
}
