import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './components/formulario/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from './components/formulario/datepicker/datepicker.component';
import { TablaFiltroComponent } from './components/tabla-filtro/tabla-filtro.component';
import { AutocompleteComponent } from './components/formulario/autocomplete/autocomplete.component';

const NGX_UI_LOADER_CONFIG: NgxUiLoaderConfig = {
	bgsColor: '#00ACC1',
	bgsOpacity: 1.5,
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
	declarations: [InputComponent, DatepickerComponent, TablaFiltroComponent, AutocompleteComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		NgxUiLoaderModule.forRoot(NGX_UI_LOADER_CONFIG),
		TranslateModule,
	],
	exports: [
		MaterialModule,
		NgxUiLoaderModule,
		TranslateModule,
		InputComponent,
		DatepickerComponent,
		TablaFiltroComponent,
		AutocompleteComponent,
	],
})
export class SharedModule {}
