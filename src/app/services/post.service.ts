import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { SnackBarService } from './snack-bar.service';
import { IPost } from '../models/post';
import { postsUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

	public show(id: number): Observable<IPost> {
		return this.http.get<IPost>(`${postsUrl}/${id}`).pipe(tap(
			(next) => { },
			(error) => {
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public update(post: IPost): Observable<any> {
		return this.http.put(`${postsUrl}/${post.id}`, {
			body: post.body
		}).pipe(tap(
			(next) => { },
			(error) => {
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public delete(id: number): Observable<any> {
		return this.http.delete(`${postsUrl}/${id}`).pipe(tap(
			(next) => { },
			(error) => {
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}