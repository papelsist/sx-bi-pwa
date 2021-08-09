import { Component } from '@angular/core';
import { AuthService } from '../@auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'PapelBI APP';
  user$ = this.auth.user$;
  constructor(private auth: AuthService) {}

  ionViewDidEnter() {}
}
