import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	post: IPost;

	constructor(private route: ActivatedRoute, private postService: PostService) { }

	ngOnInit(): void {
		// Show the post data
		this.show(+this.route.snapshot.paramMap.get('id'));
	}

	show(id: number) {
		// Get the post from the server using id
		this.postService.show(id).pipe(first()).subscribe(
			(next) => {
				this.post = next;
			}
		);
	}
}