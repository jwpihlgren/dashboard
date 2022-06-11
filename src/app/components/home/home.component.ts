import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
<<<<<<< HEAD

  loginWithRedirect() {
    this.auth.loginWithRedirect({appState: {
      target: environment.auth.redirectUri
    }});
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }

  showuser() {
    this.auth.user$.subscribe(user => {
      console.log(user)
    })
  }

=======
>>>>>>> 0014f3d3ba305eecefe35694f1023e0cd669f3fa
}