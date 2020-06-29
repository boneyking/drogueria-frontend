import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recepcion } from '../models/recepcion.model';

@Injectable({
	providedIn: 'root',
})
export class RecepcionService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	public crearRecepcion(recepcion: Recepcion) {
		return this.http.post(this.URL_API + '/recepcion', recepcion).toPromise();
	}
}
