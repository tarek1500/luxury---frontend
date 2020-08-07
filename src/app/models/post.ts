import { IUser } from "./user";

export interface IPost {
	id: number;
	body: string;
	user: IUser;
	created_at: Date;
	created_at_human: string;
}