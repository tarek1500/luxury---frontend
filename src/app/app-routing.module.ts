import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { PostComponent } from './pages/post/post.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuestGuard } from './guard/guest.guard';
import { LoggedGuard } from './guard/logged.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [LoggedGuard]
	},
	{
		path: 'timeline',
		component: TimelineComponent,
		canActivate: [LoggedGuard]
	},
	{
		path: 'posts',
		component: HomeComponent,
		canActivate: [LoggedGuard]
	},
	{
		path: 'posts/:id',
		component: PostComponent,
		canActivate: [LoggedGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [GuestGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [GuestGuard]
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }