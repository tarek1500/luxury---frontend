import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserStorageService } from '../services/user-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(private userStorageService: UserStorageService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// Add the following headers to every outgoing request
		let headers = new HttpHeaders({
			'Accept': 'application/json'
		});

		// Add the user's token if the user is logged in
		if (this.userStorageService.user?.token)
			headers = headers.append('Authorization', `Bearer ${this.userStorageService.user.token}`);

		return next.handle(request.clone({ headers }));
	}
}