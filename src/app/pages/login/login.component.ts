import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	hidePassword = true;
	isBusy = false;

	email = new FormControl('', [
		Validators.required,
		Validators.email
	]);
	password = new FormControl('', [
		Validators.required
	]);

	constructor(private router: Router, private authService: AuthService, private snackBarService: SnackBarService) { }

	ngOnInit(): void { }

	onLogin(event): void {
		this.isBusy = true;

		this.authService.login({
			email: this.email.value,
			password: this.password.value
		}, 'web').pipe(first()).subscribe(
			(next) => this.snackBarService.showSnackBar(3000, 'Logged in successfully.', ['mat-toolbar', 'mat-accent']),
			(error) => this.isBusy = false,
			() => this.router.navigate(['/'])
		);
	}
}