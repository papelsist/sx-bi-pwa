import { NgModule } from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorized } from './@auth';
import { IntroductionGuard } from './intro/intro.guard';

const routes2: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),

    // canActivate: [IntroductionGuard],
    ...canActivate(redirectUnauthorized),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroPageModule),
    ...canActivate(redirectUnauthorized),
  },
  {
    path: 'kpis',
    loadChildren: () =>
      import('./kpis/kpis.module').then((m) => m.KpisPageModule),
    ...canActivate(redirectUnauthorized),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./analytics/analytics.module').then((m) => m.AnalyticsPageModule),
    ...canActivate(redirectUnauthorized),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
    ...canActivate(redirectUnauthorized),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes2, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
