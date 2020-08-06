import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'luxury';
	mobileQuery: MediaQueryList;
	mobileQueryListener: () => void;

	constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this.mobileQueryListener);
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}
}