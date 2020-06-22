import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './theme.service';
import { THEMES, ACTIVE_THEME, ThemeOptions } from './symbols';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

const NGX_UI_LOADER_CONFIG: NgxUiLoaderConfig = {
	bgsColor: '#00ACC1',
	bgsOpacity: 0.5,
	bgsPosition: 'bottom-right',
	bgsSize: 60,
	bgsType: 'ball-spin-clockwise',
	blur: 5,
	fgsColor: '#000',
	fgsPosition: 'center-center',
	fgsSize: 60,
	fgsType: 'rectangle-bounce-pulse-out',
	gap: 24,
	logoPosition: 'center-center',
	logoSize: 120,
	logoUrl: '',
	masterLoaderId: 'master',
	overlayBorderRadius: '0',
	overlayColor: 'rgba(40, 40, 40, 0.8)',
	pbColor: '#E15526',
	pbDirection: 'ltr',
	pbThickness: 3,
	hasProgressBar: true,
	text: '',
	textColor: '#FFFFFF',
	textPosition: 'center-center',
};
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatCardModule,
		NgxUiLoaderModule.forRoot(NGX_UI_LOADER_CONFIG),
	],
	providers: [ThemeService],
	exports: [LayoutDefaultComponent, CabeceraComponent],
	declarations: [CabeceraComponent, LayoutDefaultComponent, CabeceraComponent],
	entryComponents: [],
})
export class ThemeModule {
	static forRoot(options: ThemeOptions): ModuleWithProviders {
		return {
			ngModule: ThemeModule,
			providers: [
				{
					provide: THEMES,
					useValue: options.themes,
				},
				{
					provide: ACTIVE_THEME,
					useValue: options.active,
				},
			],
		};
	}
}
