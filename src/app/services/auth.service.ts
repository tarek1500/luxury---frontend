import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { SnackBarService } from './snack-bar.service';
import { UserStorageService } from './user-storage.service';
import { IUser } from '../models/user';
import { loginUrl, registerUrl, logoutUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private snackBarService: SnackBarService, private userStorageService: UserStorageService) { }

	public login(credentials: { email: string, password: string }, device: string): Observable<IUser> {
		// Send login request
		return this.http.post<IUser>(loginUrl, {
			...credentials, device
		}).pipe(tap(
			(next) => {
				// Save the user and token to the local storage
				const user: IUser = {
					id: next.id,
					name: next.name,
					email: credentials.email,
					country: next.country,
					avatar: next.avatar,
					token: next.token
				};

				this.userStorageService.setUser(user);
			},
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public register(data: { name: string, email: string, password: string, country: string }, device: string): Observable<IUser> {
		// Send register request
		return this.http.post<IUser>(registerUrl, {
			...data, device
		}).pipe(tap(
			(next) => {
				// Save the user and token to the local storage
				const user: IUser = {
					id: next.id,
					name: data.name,
					email: data.email,
					country: data.country,
					avatar: null,
					token: next.token
				};

				this.userStorageService.setUser(user);
			},
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public logout(device: string): Observable<any> {
		// Send logout request
		return this.http.post(logoutUrl, {
			device
		}).pipe(tap(
			(next) => {
				// Remove the user from local storage
				this.userStorageService.setUser(null);
			},
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}