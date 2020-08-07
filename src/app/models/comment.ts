import { IUser } from "./user";

export interface IComment {
	id: number;
	body: string;
	user: IUser;
	created_at: Date;
	created_at_human: string;
}

export interface IComments {
	comments: IComment[];
}