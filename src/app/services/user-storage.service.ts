import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { IUser } from '../models/user'

@Injectable({
	providedIn: 'root'
})
export class UserStorageService {
	public user: IUser;
	public subject: Subject<IUser>;

	constructor() {
		this.subject = new Subject<IUser>();
	}

	public setUser(user: IUser): void {
		// Save the user data to the local storage
		localStorage.setItem('user', JSON.stringify(user));
		// Pass the data to the subject to subscribe later
		this.user = user;
		this.subject.next(user);
	}

	public getUser(): void {
		// Get the user data from the local storage
		let user = <IUser>JSON.parse(localStorage.getItem('user'));
		// Pass the data to the subject to subscribe later
		this.user = user;
		this.subject.next(user);
	}
}