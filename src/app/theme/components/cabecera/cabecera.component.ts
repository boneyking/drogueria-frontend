import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
	selector: 'app-cabecera',
	templateUrl: './cabecera.component.html',
	styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
	constructor(private authService: AuthService, private ngxLoaderService: NgxUiLoaderService) {}

	ngOnInit(): void {}

	logOut() {
		this.ngxLoaderService.start();
		this.authService.cerrarSesion();
		setTimeout(() => {
			this.ngxLoaderService.stop();
		}, 1000);
	}
}
