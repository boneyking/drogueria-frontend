import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { InformacionToken } from '../models/informacion-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	constructor() {}

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
