import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from './../theme/theme.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [PagesComponent],
	imports: [CommonModule, PagesRoutingModule, ThemeModule, SharedModule, ReactiveFormsModule],
	exports: [SharedModule],
})
export class PagesModule {}
