import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ThemeService } from './theme/theme.service';
import { WebsocketService } from './services/websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'drogueria-frontend';

	constructor(
		private translate: TranslateService,
		private router: Router,
		private themeService: ThemeService,
		private websocketService: WebsocketService
	) {
		this.translate.setDefaultLang('es');
		this.translate.use('es');
	}

	ngOnInit(): void {
		this.websocketService.listen('bienvenido').subscribe((data) => {
			console.log(data);
		});
	}
}
