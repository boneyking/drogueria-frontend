import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Articulo } from '../models/articulo.model';

@Injectable({
	providedIn: 'root',
})
export class ArticuloService {
	readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	public crearArticulo(articulo: Articulo) {
		return this.http.post(this.URL_API + '/articulo/crearArticulo', articulo).toPromise();
	}
}
