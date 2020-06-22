import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as moment from 'moment';
import 'moment/locale/es';
import { registerLocaleData, CommonModule } from '@angular/common';
import locale__es_cl from '@angular/common/locales/es-CL';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ThemeModule } from './theme/theme.module';
import { defaultTheme } from './theme/temas/default-theme';
import { ToastrModule } from 'ngx-toastr';

moment.locale('es');

registerLocaleData(locale__es_cl);

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
		RouterModule.forRoot([]),
		ThemeModule.forRoot({
			themes: [defaultTheme],
			active: 'default',
		}),
		AppRoutingModule,
		HttpClientModule,
		ToastrModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
