import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { SnackBarService } from './snack-bar.service';
import { IPaginate } from '../models/paginate';
import { IPost, IPosts } from '../models/post';
import { postsUrl, timelineUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

	public getAll(page: number, perPage: number): Observable<IPaginate<IPosts>> {
		// Get all posts from ther server
		return this.http.get<IPaginate<IPosts>>(`${postsUrl}?page=${page}&per_page=${perPage}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public getTimeline(page: number, perPage: number): Observable<IPaginate<IPosts>> {
		// Get all timeline posts from ther server
		return this.http.get<IPaginate<IPosts>>(`${timelineUrl}?page=${page}&per_page=${perPage}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public create(post: IPost): Observable<IPost> {
		// Create a post
		return this.http.post<IPost>(postsUrl, {
			body: post.body
		}).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public show(id: number): Observable<IPost> {
		// Get a comment data
		return this.http.get<IPost>(`${postsUrl}/${id}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public update(post: IPost): Observable<any> {
		// Update a post data
		return this.http.put(`${postsUrl}/${post.id}`, {
			body: post.body
		}).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public delete(id: number): Observable<any> {
		// Delete a post
		return this.http.delete(`${postsUrl}/${id}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}