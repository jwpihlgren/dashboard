import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    
    ) { }

  ngOnInit(): void {
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect({
      redirectUri: environment.auth.redirectTarget,
      appState: {
        target: environment.auth.redirectTarget
      }
    });
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }

  showuser() {
    this.auth.user$.subscribe(user => {
      console.log(user)
    })
  }
}
