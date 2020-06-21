import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RespuestaLogin } from '../models/respuesta-login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  readonly URL_API = 'http://localhost:4000/api';
  constructor(private http: HttpClient, private router: Router) {}
  ngOnDestroy(): void {}

  // tslint:disable-next-line: ban-types
  public iniciarSesion(rut: string, password: string) {
    return this.http
      .post(
        this.URL_API + '/login',
        {
          rut,
          password,
        }
      )
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
