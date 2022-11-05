import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { faRightToBracket, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faUser, faThLarge } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-menu-item',
  templateUrl: './user-menu-item.component.html',
  styleUrls: ['./user-menu-item.component.css']
})
export class UserMenuItemComponent implements OnInit {

  loginIcon: any = faRightToBracket;

 buttonGroup = {
    profile: {icon: faUser, title: "Profil"},
    logout: {icon: faSignOut, title: "Logga ut"},
    login: {icon: faSignIn, title: "Logga in"}
 }

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    
    ) { }

  ngOnInit(): void {
  }

  loginWithRedirect(event: Event) {
    event.preventDefault();
    console.log("test");
    this.auth.loginWithRedirect({
      redirectUri: `${window.location.origin}${environment.auth.redirectPath}`,
      appState: {
        target: `${window.location.origin}${environment.auth.redirectPath}}`,
      }
    });
  }

  logout() {
    this.auth.logout({ returnTo: `${this.doc.location.origin}${environment.auth.redirectPath}` })
  }

  showuser() {
    this.auth.user$.subscribe(user => {
      console.log(user)
    })
  }

}
