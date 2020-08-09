import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { UserStorageService } from '../services/user-storage.service';

@Injectable({
	providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
	constructor(private userStorageService: UserStorageService, private router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// Subscribe to the user storage to check whenever the user changed
		this.userStorageService.subject.pipe(first()).subscribe(
			(next) => {
				// Go to login if user is not existed
				if (!this.userStorageService.user?.token)
					this.router.navigate(['/login']);
			}
		);

		// Go to login if user is not existed
		if (!this.userStorageService.user?.token) {
			this.router.navigate(['/login']);

			return false;
		}

		return true;
	}
}