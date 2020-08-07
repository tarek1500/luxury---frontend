import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { PostService } from '../../../services/post.service';
import { UserStorageService } from '../../../services/user-storage.service';
import { IPost } from '../../../models/post';

@Component({
	selector: 'app-post-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreatePostComponent implements OnInit {
	@Output('created') created = new EventEmitter<IPost>();

	isBusy = false;

	body = new FormControl('', [
		Validators.required
	]);

	constructor(private postService: PostService, private userStorageService: UserStorageService) { }

	ngOnInit(): void { }

	onCreate(event): void {
		this.isBusy = true;

		this.postService.create({
			id: 0,
			body: this.body.value,
			user: null,
			comments: null,
			created_at: null,
			created_at_human: null,
		}).pipe(first()).subscribe(
			(next) => {
				next.body = this.body.value;
				next.user = this.userStorageService.user;
				next.created_at = new Date();
				next.created_at_human = 'now';
				this.created.emit(next);
				this.isBusy = false
				this.body.setValue('');
				this.body.setErrors(null);
			},
			(error) => this.isBusy = false
		);
	}
}