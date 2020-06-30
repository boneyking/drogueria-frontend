import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Proveedor } from '../models/proveedor.model';
import { RespuestaPaginada } from '../models/responses/respuesta-paginada.model';
import { RequestPaginada } from '../models/requests/request-paginada.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProveedorService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	private consultaBuscarProveedorPorRut(rutProveedor: string): Observable<RespuestaPaginada<Proveedor>> {
		return this.http.get<RespuestaPaginada<Proveedor>>(this.URL_API + '/proveedor/buscarProveedorPorRut/' + rutProveedor);
	}

	private consultaBuscarProveedorPorNombre(nombreProveedor: string): Observable<RespuestaPaginada<Proveedor>> {
		return this.http.get<RespuestaPaginada<Proveedor>>(this.URL_API + '/proveedor/buscarProveedorPorNombre/' + nombreProveedor);
	}

	public buscarProveedorPorRut(rutProveedor: string): Promise<RespuestaPaginada<Proveedor>> {
		const resultado = this.consultaBuscarProveedorPorRut(rutProveedor)
			.pipe(
				map((res) => {
					return res;
				})
			)
			.toPromise();
		return resultado;
	}

	public buscarProveedorPorNombre(nombreProveedor: string): Promise<RespuestaPaginada<Proveedor>> {
		const resultado = this.consultaBuscarProveedorPorNombre(nombreProveedor)
			.pipe(
				map((res) => {
					return res;
				})
			)
			.toPromise();
		return resultado;
	}
}
