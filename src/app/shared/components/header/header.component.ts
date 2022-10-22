import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  defaultTitle: string = "PNC"
  largeTitle: string = "Pihl-Net-Central"
  loginIcon: any = faRightToBracket;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    
    ) { }

  ngOnInit(): void {
  }

  loginWithRedirect() {
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

  innerWidth(): number {
    console.log(window.innerWidth);
    return window.innerWidth;

  }

}