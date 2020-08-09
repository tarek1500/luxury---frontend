import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	posts: IPost[];
	currentPage: number = 1;
	perPage: number = 10;
	total: number;

	isBusy: boolean = false;

	constructor(private postService: PostService) {
		this.posts = [];
	}

	ngOnInit(): void {
		// Get all posts (paginated) on page load
		this.getAll(this.currentPage, this.perPage);
	}

	getAll(page: number, perPage: number): void {
		this.isBusy = true;

		// Get all posts.
		this.postService.getAll(page, perPage).pipe(first()).subscribe(
			(next) => {
				// Push to posts' array and setup limits
				this.posts.push(...next.data.posts);
				this.currentPage = next.meta.current_page;
				this.perPage = next.meta.per_page;
				this.total = next.meta.total;

				if (this.total > this.posts.length)
					this.isBusy = false;
			}
		);
	}

	onDeleted(id: number): void {
		// Remove the post from the array if the user delete it (after calling the API).
		this.posts = this.posts.filter((post) => post.id !== id);
	}

	onLoadMore(event): void {
		// Get all posts (paginated) if click on load more
		this.getAll(this.currentPage + 1, this.perPage);
	}
}