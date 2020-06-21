import {
  ExtraOptions,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: false,
  scrollPositionRestoration: 'top',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
