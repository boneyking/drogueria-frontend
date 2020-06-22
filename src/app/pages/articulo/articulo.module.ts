import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './articulo.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from 'src/app/theme/theme.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticuloCrearComponent } from './articulo-crear/articulo-crear.component';

const routes: Routes = [
	{
		path: 'articulo',
		component: ArticuloComponent,
	},
	{
		path: 'crearArticulo',
		component: ArticuloCrearComponent,
	},
];

@NgModule({
	declarations: [ArticuloComponent, ArticuloCrearComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ThemeModule, SharedModule, ReactiveFormsModule],
	exports: [ArticuloComponent],
})
export class ArticuloModule {}
