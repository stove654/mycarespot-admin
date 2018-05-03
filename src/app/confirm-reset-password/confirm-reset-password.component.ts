import {
	Component,
	OnInit,
} from '@angular/core';

import {AppState} from '../app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import {Config} from '../app.config';

let self;
@Component({
	/**
	 * The selector is what angular internally uses
	 * for `document.querySelectorAll(selector)` in our index.html
	 * where, in this case, selector is the string 'home'.
	 */
	selector: 'confirm-reset-password',  // <login></login>

	styleUrls: ['./confirm-reset-password.component.css'],
	templateUrl: './confirm-reset-password.component.html'
})
export class ConfirmResetPasswordComponent implements OnInit {
	isResetPassword = false;
	resetform: FormGroup;

	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState,  private http: HttpClient, private router: Router) {
		self = this;

		self.resetform = new FormGroup({
			password: new FormControl(),
			repassword: new FormControl(),
		});
	}

	public ngOnInit() {

	}


	resetPassword() {
		function gup( name, url ) {
			if (!url) url = location.href;
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			let regexS = "[\\?&]"+name+"=([^&#]*)";
			let regex = new RegExp( regexS );
			let results = regex.exec( url );
			return results == null ? null : results[1];
		}

		const token = gup('token', window.location);

		this.http.post(Config.url + Config.api.verifyResetPassword, {
			token: token,
			password: self.resetform.value.password
		}).subscribe(data => {
			console.log(data)
			window.localStorage.setItem('auth', JSON.stringify({
				user: data,
				token: token
			}));
			this.isResetPassword = true;
			setTimeout(() => {
				this.router.navigate(['login']);
			}, 4000)
		}, function () {
		});
	}


}
