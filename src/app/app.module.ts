import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RequestInterceptor } from './interceptors/request.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuestGuard } from './guard/guest.guard';
import { LoggedGuard } from './guard/logged.guard';

@NgModule({
	declarations: [
		AppComponent,
		SnackBarComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSnackBarModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptor,
			multi: true
		},
		GuestGuard,
		LoggedGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }