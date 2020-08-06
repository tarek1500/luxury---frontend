import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuestGuard } from './guard/guest.guard';
import { LoggedGuard } from './guard/logged.guard';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [GuestGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [GuestGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }