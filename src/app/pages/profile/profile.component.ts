import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	hidePassword = true;
	isBusy = false;

	name = new FormControl('');
	email = new FormControl('', [
		Validators.email
	]);
	password = new FormControl('');
	country = new FormControl('');
	avatarLink: string;
	avatar: File;

	constructor(private router: Router, private profileService: ProfileService, private snackBarService: SnackBarService) { }

	ngOnInit(): void {
		// Get the user data from the server
		this.profileService.show().pipe(first()).subscribe(
			(next) => {
				// Initialize the form data
				this.name = new FormControl(next.name);
				this.email = new FormControl(next.email, [
					Validators.email
				]);
				this.password = new FormControl('');
				this.country = new FormControl(next.country);
				this.avatarLink = next.avatar;
			}
		);
	}

	onAvatarChange(event) {
		// Change the avatar image if user try to upload new image
		let reader = new FileReader();
		this.avatar = event.target.files[0];

		reader.onload = () => this.avatarLink = reader.result.toString();
		reader.readAsDataURL(event.target.files[0]);
	}

	onProfileUpdate(event): void {
		this.isBusy = true;

		// Send the new profile data to the server
		this.profileService.update({
			name: this.name.value,
			email: this.email.value,
			password: this.password.value,
			country: this.country.value,
			avatar: this.avatar
		}).pipe(first()).subscribe(
			(next) => {
				// Show notification on success
				this.snackBarService.showSnackBar(3000, 'Profile updated successfully.', ['mat-toolbar', 'mat-accent']);
				this.isBusy = false;
				this.router.navigate(['/home']);
			},
			(error) => this.isBusy = false
		);
	}
}