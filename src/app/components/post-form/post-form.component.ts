import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
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
	comment: FormControl;

	constructor(private postService: PostService, private commentService: CommentService, private userStorageService: UserStorageService) {
		this.user = userStorageService.user;
	}

	ngOnInit(): void {
		// Initialize the form data
		this.body = new FormControl(this.post.body, [
			Validators.required
		]);
		this.comment = new FormControl('', [
			Validators.required
		]);
	}

	onUpdate(event) {
		// Copy the post and add body, to send to the api
		this.isBusy = true;
		let post = { ...this.post };
		post.body = this.body.value;

		// Send the new body to update
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

		// Delete the select post
		this.postService.delete(this.post.id).pipe(first()).subscribe(
			(next) => {
				this.deleted.emit(this.post.id);
				this.isBusy = false;
				this.showEdit = false;
			},
			(error) => this.isBusy = false
		);
	}

	onCreateComment(event): void {
		this.isBusy = true;

		// Create a comment for the select post
		this.commentService.create({
			id: 0,
			body: this.comment.value,
			user: null,
			created_at: null,
			created_at_human: null,
		}, this.post).pipe(first()).subscribe(
			(next) => {
				// Setup the new comment data and push it to comments' array
				next.body = this.comment.value;
				next.user = this.userStorageService.user;
				next.created_at = new Date();
				next.created_at_human = 'now';
				this.post.comments.push(next);
				this.isBusy = false
				this.comment.setValue('');
				this.comment.setErrors(null);
			},
			(error) => this.isBusy = false
		);
	}

	onCommentDeleted(id: number): void {
		// Remove the comment from the array if the user delete it (after calling the API).
		this.post.comments = this.post.comments.filter((comment) => comment.id !== id);
	}
}