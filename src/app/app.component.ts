/**
 * Angular 2 decorators and services
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from 'environments/environment';
import {AppState} from './app.service';
import {Router} from '@angular/router';

/**
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./app.component.css'
	],
	template: `
		<header>
			<div class="cont">
				<div class="Hlogo">
					<img src="../assets/MyCareSpot.png" alt="My Care Spot">
				</div>
				<nav class="menuGen Hlogin" *ngIf="!currentUser.verifyEmail || !currentUser.verifyPhone">
					<ul>
						<li><a [routerLink]=" ['./signup'] " routerLinkActive="current"
							   [routerLinkActiveOptions]="{exact: true}">Sign up</a></li>
						<li><a [routerLink]=" ['./login'] " routerLinkActive="current"
							   [routerLinkActiveOptions]="{exact: true}">Log In</a></li>
					</ul>
				</nav>
				<nav class="menuGen Hlogin" *ngIf="currentUser.verifyEmail && currentUser.verifyPhone">
					<ul>
						<li><a (click)="logOut()">Log out</a></li>
						
					</ul>
				</nav>
			</div>
		</header>

		<main style="    height: 100%;
    width: 100%;
    padding-top: 60px;">
			<router-outlet></router-outlet>
		</main>

		<footer>
			<div class="cont">
				<div class="menufooter">
					<a href="">about us</a>
					<a href="">support</a>
					<a href="">blog</a>
					<a href="">press</a>
					<a href="">jobs</a>
					<a href="">privacy</a>
					<a href="">terms</a>
					<a href="">language</a>
				</div>
				<div class="legal">
					© 2018 mycarespot
				</div>
			</div>
		</footer>
	`
})
export class AppComponent implements OnInit {
	currentUser = {
		_id: null,
		verifyEmail: false,
		verifyPhone: false,
	};

	constructor(public appState: AppState, private router: Router) {
	}

	public ngOnInit() {
		if (window.localStorage.getItem('auth')) {
			this.currentUser = JSON.parse(window.localStorage.getItem('auth')).user;
		}

		if (this.currentUser._id && this.currentUser.verifyPhone) {
			this.router.navigate(['home']);
		}
		console.log('Initial App State', this.appState.state);
	}

	logOut() {
		window.localStorage.clear();
		this.currentUser = {
			_id: null,
			verifyEmail: false,
			verifyPhone: false,
		};
		this.router.navigate(['login']);
	}
}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
