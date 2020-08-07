export interface IUser {
	id: number;
	name: string;
	email: string;
	country: string;
	avatar: string | ImageBitmap;
	token: string;
}