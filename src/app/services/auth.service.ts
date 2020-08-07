import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { SnackBarService } from './snack-bar.service';
import { UserStorageService } from './user-storage.service';
import { IToken } from '../models/token';
import { IUser } from '../models/user';
import { loginUrl, registerUrl, logoutUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private snackBarService: SnackBarService, private userStorageService: UserStorageService) { }

	public login(credentials: { email: string, password: string }, device: string): Observable<IToken> {
		return this.http.post<IToken>(loginUrl, {
			...credentials, device
		}).pipe(tap(
			(next) => {
				const user: IUser = {
					id: 0,
					name: '',
					email: credentials.email,
					country: '',
					avatar: null,
					token: next.token
				};

				this.userStorageService.setUser(user);
			},
			(error) => {
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public register(data: { name: string, email: string, password: string, country: string }, device: string): Observable<IToken> {
		return this.http.post<IToken>(registerUrl, {
			...data, device
		}).pipe(tap(
			(next) => {
				const user: IUser = {
					id: 0,
					name: data.name,
					email: data.email,
					country: data.country,
					avatar: null,
					token: next.token
				};

				this.userStorageService.setUser(user);
			},
			(error) => {
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public logout(device: string): Observable<any> {
		return this.http.post(logoutUrl, {
			device
		}).pipe(tap(
			(next) => {
				this.userStorageService.setUser(null);
			},
			(error) => {
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}