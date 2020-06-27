import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArsenalCrearComponent } from './arsenal-crear/arsenal-crear.component';
import { Routes, RouterModule } from '@angular/router';
import { ArsenalComponent } from './arsenal.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: 'arsenal',
		component: ArsenalComponent,
	},
	{
		path: 'crearArsenal',
		component: ArsenalCrearComponent,
	},
];

@NgModule({
	declarations: [ArsenalComponent, ArsenalCrearComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ThemeModule, SharedModule, ReactiveFormsModule],
	exports: [ArsenalComponent]
})
export class ArsenalModule {}
