import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { InformacionToken } from '../models/informacion-token.model';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	constructor() {}

	public decodificarToken(token: string): InformacionToken {
		return jwt_decode(token) as InformacionToken;
	}
}
