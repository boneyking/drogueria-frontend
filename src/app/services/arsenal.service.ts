import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Arsenal } from '../models/arsenal.model';
import { RequestPaginada } from '../models/requests/request-paginada.model';
import { RespuestaPaginada } from '../models/responses/respuesta-paginada.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ArsenalService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	public crearArsenal(arsenal: Arsenal) {
		return this.http.post(this.URL_API + '/arsenal/crearArsenal', arsenal).toPromise();
	}

	public obtenerArsenalPaginado(paginada: RequestPaginada) {
		return this.http.post<RespuestaPaginada<Arsenal>>(this.URL_API + '/arsenal/obtenerArsenalPaginado', paginada).toPromise();
	}
}
