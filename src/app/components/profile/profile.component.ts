import { SessionStorageService } from './../../shared/services/session-storage.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { UserService } from './../../shared/services/user.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    @Inject(DOCUMENT) private doc: Document
    
    ) { }

  ngOnInit(): void {
    /* this.showuser() */

    this.userService.getUserMetadata().subscribe(data => console.log(data))
  }

  showuser(event: any) {
    this.auth.idTokenClaims$.subscribe(claim => console.log(claim))
    this.auth.user$.subscribe(user => {
      console.log(user)
      event.target.innerText = "Användare loggad"
      setTimeout(() => {event.target.innerText = "Logga användare"}, 3000)
    })
  }

  clearStorage(event: any) {
    this.localStorageService.clearlocalStorage()
    this.sessionStorageService.clearSessionStorage()
    console.log(event.target);
    event.target.innerText = "Lagring rensad"
    setTimeout(() => {event.target.innerText = "Rensa Lagring"}, 3000)
  }


}
