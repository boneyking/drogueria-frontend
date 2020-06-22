import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { paginas } from './pages.routes.names';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: paginas.LOGIN,
				loadChildren: () => import('../pages/login/login.module').then((m) => m.LoginModule),
			},
			{
				path: paginas.ARTICULO,
				canActivate: [AuthGuard],
				loadChildren: () => import('../pages/articulo/articulo.module').then((m) => m.ArticuloModule),
			},
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
