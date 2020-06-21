import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.logueado()) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
