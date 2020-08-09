import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { UserStorageService } from '../../services/user-storage.service';
import { IComment } from '../../models/comment';
import { IUser } from '../../models/user';

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
	@Input('comment') comment: IComment;
	@Output('deleted') deleted = new EventEmitter<number>();

	user: IUser;
	showEdit = false;
	isBusy = false;

	body: FormControl;

	constructor(private commentService: CommentService, userStorageService: UserStorageService) {
		this.user = userStorageService.user;
	}

	ngOnInit(): void {
		// Initialize the form data
		this.body = new FormControl(this.comment.body, [
			Validators.required
		]);
	}

	onUpdate(event) {
		// Copy the comment and add body, to send to the api
		this.isBusy = true;
		let comment = { ...this.comment };
		comment.body = this.body.value;

		// Send the new body to update
		this.commentService.update(comment).pipe(first()).subscribe(
			(next) => {
				this.comment.body = this.body.value
				this.isBusy = false;
				this.showEdit = false;
			},
			(error) => this.isBusy = false
		);
	}

	onDelete(event) {
		this.isBusy = true;

		// Delete the select comment
		this.commentService.delete(this.comment.id).pipe(first()).subscribe(
			(next) => {
				this.deleted.emit(this.comment.id);
				this.isBusy = false;
				this.showEdit = false;
			},
			(error) => this.isBusy = false
		);
	}
}