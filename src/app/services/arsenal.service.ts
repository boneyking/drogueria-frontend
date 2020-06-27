import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Arsenal } from '../models/arsenal.model';

@Injectable({
	providedIn: 'root',
})
export class ArsenalService {
	private readonly URL_API = environment.RUTA_API;
	constructor(private http: HttpClient, private router: Router) {}

	public crearArsenal(arsenal: Arsenal){
		return this.http.post(this.URL_API + '/arsenal/crearArsenal', arsenal).toPromise();
	}
}
