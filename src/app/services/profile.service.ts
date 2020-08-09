import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from './user-storage.service';
import { SnackBarService } from './snack-bar.service';
import { IUser } from '../models/user';
import { profileUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(private http: HttpClient, private userStorageService: UserStorageService, private snackBarService: SnackBarService) { }

	public show(): Observable<IUser> {
		// Get the current user data
		return this.http.get<IUser>(profileUrl).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public update(data: { name: string, email: string, password: string, country: string, avatar: File }): Observable<IUser> {
		// Setup new profile data
		let form = new FormData();
		form.append('_method', 'PUT');

		if (data.name) form.append('name', data.name);
		if (data.email) form.append('email', data.email);
		if (data.password) form.append('password', data.password);
		if (data.country) form.append('country', data.country);
		if (data.avatar) form.append('avatar', data.avatar);

		// Update the current user data
		return this.http.post<IUser>(profileUrl, form).pipe(tap(
			(next) => {
				// Save the new user data to the local storage
				const user: IUser = {
					id: this.userStorageService.user.id,
					name: data.name ? data.name : this.userStorageService.user.name,
					email: data.email ? data.email : this.userStorageService.user.email,
					country: data.country ? data.country : this.userStorageService.user.country,
					avatar: next.avatar ? next.avatar : this.userStorageService.user.avatar,
					token: this.userStorageService.user.token
				};

				this.userStorageService.setUser(user);
			},
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}