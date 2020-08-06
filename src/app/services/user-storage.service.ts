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
		localStorage.setItem('user', JSON.stringify(user));
		this.user = user;
		this.subject.next(user);
	}

	public getUser(): void {
		let user = <IUser>JSON.parse(localStorage.getItem('user'));
		this.user = user;
		this.subject.next(user);
	}
}