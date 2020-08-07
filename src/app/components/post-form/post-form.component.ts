import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { UserStorageService } from '../../services/user-storage.service';
import { IPost } from '../../models/post';
import { IUser } from '../../models/user';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
	@Input('post') post: IPost;
	@Output('deleted') deleted = new EventEmitter<number>();

	user: IUser;
	showEdit = false;
	isBusy = false;

	body: FormControl;

	constructor(private postService: PostService, userStorageService: UserStorageService) {
		this.user = userStorageService.user;
	}

	ngOnInit(): void {
		this.body = new FormControl(this.post.body, [
			Validators.required
		]);
	}

	onUpdate(event) {
		this.isBusy = true;
		let post = { ...this.post };
		post.body = this.body.value;

		this.postService.update(post).pipe(first()).subscribe(
			(next) => {
				this.post.body = this.body.value
				this.isBusy = false;
				this.showEdit = false;
			},
			(error) => this.isBusy = false
		);
	}

	onDelete(event) {
		this.isBusy = true;

		this.postService.delete(this.post.id).pipe(first()).subscribe(
			(next) => {
				this.deleted.emit(this.post.id);
				this.isBusy = false;
				this.showEdit = false;
			},
			(error) => this.isBusy = false
		);
	}
}