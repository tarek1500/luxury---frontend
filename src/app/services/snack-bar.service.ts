import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) { }

	public showSnackBar(duration: number, message: object | string, style: Array<string> = []) {
		const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
		const verticalPosition: MatSnackBarVerticalPosition = 'top';

		if (typeof message === 'string')
			message = { message };

		this.snackBar.openFromComponent(SnackBarComponent, {
			data: message,
			duration: duration,
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			panelClass: [...style]
		});
	}
}