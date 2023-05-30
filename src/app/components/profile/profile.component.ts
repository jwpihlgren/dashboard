import { SessionStorageService } from './../../shared/services/session-storage.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { UserService } from './../../shared/services/user.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, ReplaySubject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  destroy$: ReplaySubject<boolean> = new ReplaySubject(1)
  userMetaData$!: Observable<any>
  idTokenClaims$!: Observable<any>
  user$!: Observable<any>


  constructor(
    public auth: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    this.userMetaData$ = this.userService.getUserMetadata().pipe(
      takeUntil(this.destroy$),
      tap((user: any) => {
        console.log(user);
      }))

      this.userMetaData$.subscribe()
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  showuser(event: any) {
    this.idTokenClaims$ = this.auth.idTokenClaims$.pipe(
      takeUntil(this.destroy$),
      tap((idTokenClaims: any) => console.log("idTokenClaims", idTokenClaims)))
    
    this.idTokenClaims$.subscribe()

    this.user$ = this.auth.user$.pipe(
      takeUntil(this.destroy$),
      tap((user: any) => console.log("user", user)))

    this.user$.subscribe()

    event.target.innerText = "Användare loggad"
    setTimeout(() => {event.target.innerText = "Logga användare"}, 3000)

  }

  clearStorage(event: any) {
    this.localStorageService.clearlocalStorage()
    this.sessionStorageService.clearSessionStorage()
    console.log("Storage cleared");
    event.target.innerText = "Lagring rensad"
    setTimeout(() => {event.target.innerText = "Rensa Lagring"}, 3000)
  }


}
