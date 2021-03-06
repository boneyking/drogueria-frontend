import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ThemeService } from './theme/theme.service';
import { WebSocketService } from './services/web-socket.service';
import { AuthService } from './services/auth.service';

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
		private webSocketService: WebSocketService,
		private authService: AuthService
	) {
		this.translate.setDefaultLang('es');
		this.translate.use('es');

		this.webSocketService.verificaSocket().subscribe(() => {});
		this.authService.expiraUsuario().subscribe((expiro) => {
			if (expiro) {
				this.authService.cerrarSesion();
			}
		});
	}

	ngOnInit(): void {}
}
