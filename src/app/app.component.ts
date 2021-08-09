import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './@auth';
import { DisplayModeService } from './core/services/display-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user$ = this.auth.user$;
  constructor(
    private auth: AuthService,
    private router: Router,
    private displayService: DisplayModeService
  ) {
    this.initializeApp();
  }

  signOut() {
    this.auth.singOut();
    this.router.navigate(['/login']);
  }

  initializeApp() {
    this.displayService.startDarkMode();
  }
}
