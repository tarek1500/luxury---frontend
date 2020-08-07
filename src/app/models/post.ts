import { IUser } from './user';
import { IComment } from './comment';

export interface IPost {
	id: number;
	body: string;
	user: IUser;
	comments: IComment[];
	created_at: Date;
	created_at_human: string;
}

export interface IPosts {
	posts: IPost[];
}