import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Validadores } from 'src/app/utils/validadores';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RespuestaLogin } from 'src/app/models/respuesta-login.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import * as jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	public formulario: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private ngxLoaderService: NgxUiLoaderService,
		private notificacionesService: NotificacionesService
	) {
		this.usuarioYaLogueado();
	}

	ngOnInit(): void {
		this.inicializarFormulario();
	}

	private inicializarFormulario(): void {
		this.formulario = this.formBuilder.group({
			rut: new FormControl(null, [Validators.required, Validadores.rutValido]),
			password: new FormControl(null, [Validators.required]),
		});
	}

	usuarioYaLogueado() {
		if (this.authService.logueado()) {
			this.router.navigate(['/']);
		}
	}

	onSubmit() {
		this.ngxLoaderService.start();
		const rut = this.formulario.controls.rut.value;
		const password = this.formulario.controls.password.value;

		try {
			this.authService.iniciarSesion(rut, password).then((res: RespuestaLogin) => {
				if (res.token === '') {
					this.notificacionesService.mostrarMensaje('error', 'Error', res.mensaje);
				} else {
					localStorage.setItem('token', res.token);
					const infoToken = jwt_decode(res.token);
					this.notificacionesService.mostrarMensaje('success', 'Bienvenido', infoToken.nombreUsuario);
					this.router.navigate(['/']);
				}
				this.ngxLoaderService.stop();
			});
		} catch (error) {
			console.log(error);
			this.ngxLoaderService.stop();
		}
	}
}
