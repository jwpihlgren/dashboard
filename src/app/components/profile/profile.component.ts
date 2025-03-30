import { SessionStorageService } from './../../shared/services/session-storage.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { UserService } from './../../shared/services/user.service';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { ColumnComponent } from 'src/app/shared/layouts/column/column.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ColumnComponent]
})
export class ProfileComponent {

  userMetaData: Signal<any> = signal(undefined)
  user: Signal<any> = signal(undefined)

  protected userService: UserService = inject(UserService)
  protected localStorageService: LocalStorageService = inject(LocalStorageService)
  protected sessionStorageService: SessionStorageService = inject(SessionStorageService)
  protected auth: AuthService = inject(AuthService)

  constructor() {
    this.userMetaData = toSignal(this.userService.getUserMetadata())
    this.user = toSignal(this.userService.getUser())
  }

  showuser(event: any) {
    event.target.innerText = "Loggad"
    console.log("userMetaData", this.userMetaData())
    console.log("user", this.user())
    setTimeout(() => { event.target.innerText = "Logga användare" }, 3000)
  }


  clearStorage(event: any) {
    this.localStorageService.clearlocalStorage()
    this.sessionStorageService.clearSessionStorage()
    console.log("Storage cleared");
    event.target.innerText = "Lagring rensad"
    setTimeout(() => { event.target.innerText = "Rensa Lagring" }, 3000)
  }


}
