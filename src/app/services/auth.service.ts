import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IToken } from '../models/token';
import { loginUrl, registerUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) { }

	public login(credentials: { email: string, password: string }, device: string): Observable<IToken> {
		return this.http.post<IToken>(loginUrl, {
			...credentials, device
		});
	}

	public register(data: { name: string, email: string, password: string, country: string }, device: string): Observable<IToken> {
		return this.http.post<IToken>(registerUrl, {
			...data, device
		});
	}
}