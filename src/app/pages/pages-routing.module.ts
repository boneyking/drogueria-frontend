import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { paginas } from './pages.routes.names';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: paginas.LOGIN,
        loadChildren: () =>
          import('../pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: paginas.ARTICULO,
        loadChildren: () =>
          import('../pages/articulo/articulo.module').then(
            (m) => m.ArticuloModule
          ),
      },
      {
        path: paginas.LOGOUT,
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('../pages/abonos/abonos.module').then((m) => m.AbonosModule),
      // },
      // {
      //   path: paginasNombreRutas.LOGIN,
      //   loadChildren: () =>
      //     import('./login/login.module').then((m) => m.LoginModule),
      // },
      // {
      //   path: paginasNombreRutas.LOGOUT,
      //   loadChildren: () =>
      //     import('./login/login.module').then((m) => m.LoginModule),
      // },
      // {
      //   path: 'abonos',
      //   loadChildren: () =>
      //     import('../pages/abonos/abonos.module').then((m) => m.AbonosModule),
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
