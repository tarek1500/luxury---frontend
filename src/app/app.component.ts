import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserStorageService } from './services/user-storage.service';
import { AuthService } from './services/auth.service';
import { SnackBarService } from './services/snack-bar.service';
import { IUser } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'luxury';
	userSubscription: Subscription;
	user: IUser;
	mobileQuery: MediaQueryList;
	mobileQueryListener: () => void;

	constructor(
		media: MediaMatcher,
		changeDetectorRef: ChangeDetectorRef,
		private userStorageService: UserStorageService,
		private authService: AuthService,
		private snackBarService: SnackBarService
	) {
		// Subscribe if window size change
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this.mobileQueryListener);
		// Subscribe to user data on load
		this.userSubscription = this.userStorageService.subject.subscribe((user) => {
			this.user = user;
		});
	}

	ngOnInit(): void {
		// Get the user data on load
		this.userStorageService.getUser();
	}

	ngOnDestroy(): void {
		// Unsubscribe on destroy
		this.mobileQuery.removeListener(this.mobileQueryListener);
		this.userSubscription.unsubscribe();
	}

	onLogout(event) {
		event.preventDefault();
		// Send logout request
		this.authService.logout('web').pipe(first()).subscribe(
			// Show notification on success
			(next) => this.snackBarService.showSnackBar(3000, 'Logged out successfully.', ['mat-toolbar', 'mat-accent'])
		);
	}
}