import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Arsenal } from '../models/arsenal.model';
import { RequestPaginada } from '../models/requests/request-paginada.model';
import { RespuestaPaginada } from '../models/responses/respuesta-paginada.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ArsenalService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	public crearArsenal(arsenal: Arsenal) {
		return this.http.post(this.URL_API + '/arsenal/crearArsenal', arsenal).toPromise();
	}

	private consultaObtenerArsenalPaginado(paginada: RequestPaginada): Observable<RespuestaPaginada<Arsenal>> {
		return this.http.post<RespuestaPaginada<Arsenal>>(this.URL_API + '/arsenal/obtenerArsenalPaginado', paginada);
	}

	private consultaObtenerArsenalPorNombre(nombreArsenal: string): Observable<RespuestaPaginada<Arsenal>> {
		return this.http.get<RespuestaPaginada<Arsenal>>(this.URL_API + '/arsenal/buscarArsenalPorNombre/' + encodeURIComponent(nombreArsenal));
	}

	public obtenerArsenalPaginado(requestPaginada: RequestPaginada):Promise<RespuestaPaginada<Arsenal>>{
		const resultado = this.consultaObtenerArsenalPaginado(requestPaginada)
		.pipe(
			map((res) => {
				return res;
			})
		).toPromise();
		return resultado;
	}

	public buscarArsenalPorNombre(nombreArsenal: string): Promise<RespuestaPaginada<Arsenal>> {
		const resultado = this.consultaObtenerArsenalPorNombre(nombreArsenal)
			.pipe(
				map((res) => {
					return res;
				})
			)
			.toPromise();
		return resultado;
	}
}
