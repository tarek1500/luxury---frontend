import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) { }

	public showSnackBar(duration: number, message: object | string, style: Array<string> = []) {
		// Setup the notification data to show
		const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
		const verticalPosition: MatSnackBarVerticalPosition = 'top';

		// Convert the message to object if it is a string
		if (typeof message === 'string')
			message = { message };

		// Send the notification data to the component
		this.snackBar.openFromComponent(SnackBarComponent, {
			data: message,
			duration: duration,
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			panelClass: [...style]
		});
	}
}