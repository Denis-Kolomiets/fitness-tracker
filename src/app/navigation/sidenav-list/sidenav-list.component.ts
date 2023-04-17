import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>()
  isAuth = false
  authSubscription: Subscription

  constructor(private authService: AuthService){

  }
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }

  onLogout() {
    this.closeSidenav()
    this.authService.logout()
  }

  closeSidenav() {
    this.sidenavClose.emit()
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }
}
