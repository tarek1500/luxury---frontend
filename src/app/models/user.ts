export interface IUser {
	id: number;
	name: string;
	email: string;
	country: string;
	avatar: string;
	token: string;
}

export interface IUsers {
	users: IUser[];
}