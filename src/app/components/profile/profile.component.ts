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
    @Inject(DOCUMENT) private doc: Document
    
    ) { }

  ngOnInit(): void {
    /* this.showuser() */

    this.userService.getUserMetadata().subscribe(data => console.log(data))
  }

  showuser() {
    this.auth.idTokenClaims$.subscribe(claim => console.log(claim))
    this.auth.user$.subscribe(user => {
      console.log(user)
    })
  }


}
