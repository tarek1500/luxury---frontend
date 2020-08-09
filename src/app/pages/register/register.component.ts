import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	hidePassword = true;
	isBusy = false;

	// Initialize the form data
	name = new FormControl('', [
		Validators.required
	]);
	email = new FormControl('', [
		Validators.required,
		Validators.email
	]);
	password = new FormControl('', [
		Validators.required
	]);
	country = new FormControl('', [
		Validators.required
	]);

	constructor(private router: Router, private authService: AuthService, private snackBarService: SnackBarService) { }

	ngOnInit(): void { }

	onRegister(event): void {
		this.isBusy = true;

		// Send register request to the server
		this.authService.register({
			name: this.name.value,
			email: this.email.value,
			password: this.password.value,
			country: this.country.value
		}, 'web').pipe(first()).subscribe(
			// Show notification on success
			(next) => this.snackBarService.showSnackBar(3000, 'Registered successfully.', ['mat-toolbar', 'mat-accent']),
			(error) => this.isBusy = false,
			// Go to home on complete
			() => this.router.navigate(['/'])
		);
	}
}