import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RespuestaLogin } from '../models/responses/respuesta-login.model';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router, private utilsService: UtilsService) {}

	public iniciarSesion(rut: string, password: string) {
		return this.http
			.post(this.URL_API + '/login', {
				rut,
				password,
			})
			.toPromise();
	}

	public cerrarSesion() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	public logueado() {
		return !!localStorage.getItem('token');
	}

	public expiraUsuario(): Observable<boolean> {
		if(localStorage.getItem('token') !== null){
			const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));
			const expira = new Date(informacionToken.exp * 1000).getTime();
			const momentoActual = new Date().getTime();
			return expira < momentoActual ? ObservableOf(true) : ObservableOf(false);
		}

		return ObservableOf(false);
	}
}
