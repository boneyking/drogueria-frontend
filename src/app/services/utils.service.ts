import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { InformacionToken } from '../models/informacion-token.model';
import { environment } from 'src/environments/environment';
import { Responsable } from '../models/responsable.model';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	constructor() {}

	public obtenerResponsable(token: string): Responsable{
		const responsable = new Responsable();
		const informacionToken = this.decodificarToken(token);
		responsable.nombre = informacionToken.nombreUsuario;
		responsable.usuarioId = informacionToken.id;
		return responsable;
	}

	public decodificarToken(token: string): InformacionToken {
		return jwt_decode(token) as InformacionToken;
	}

	public calcularBruto(valor: number): number {
		return Math.round(valor * environment.IVA);
	}

	public calcularIVA(valor: number): number {
		return Math.round(valor * (environment.IVA - 1));
	}
}
