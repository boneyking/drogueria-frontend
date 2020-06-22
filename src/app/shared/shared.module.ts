import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';


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
	declarations: [],
	imports: [CommonModule, MaterialModule, NgxUiLoaderModule.forRoot(NGX_UI_LOADER_CONFIG)],
	exports: [MaterialModule, NgxUiLoaderModule],
})
export class SharedModule {}
