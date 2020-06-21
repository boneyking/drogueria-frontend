import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RespuestaLogin } from '../models/respuesta-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly URL_API = environment.RUTA_API;
  constructor(private http: HttpClient, private router: Router) {}

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
}
