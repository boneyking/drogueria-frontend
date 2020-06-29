import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router, private utilsService: UtilsService) {}
	canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.logueado()) {
			const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));
			const expira = new Date(informacionToken.exp * 1000).getTime();
			const momentoActual = new Date().getTime();

			if (expira < momentoActual) {
				this.authService.cerrarSesion();
				return false;
			} else {
				return true;
			}
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
