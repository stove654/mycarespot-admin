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
	selector: 'forgot-password',  // <login></login>

	styleUrls: ['./forgot-password.component.css'],
	templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
	resetform: FormGroup;
	isCapchar = false;
	isSend = false;
	isLoading = false;
	invalid = false;
	email = '';
	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState,  private http: HttpClient, private router: Router) {
		self = this;
	}

	public ngOnInit() {
		self.resetform = new FormGroup({
			email: new FormControl(),
			password: new FormControl(),
		});
	}

	resetPassword() {
		self.isLoading = true;
		self.invalid = false;
		self.isSend = false;
		this.http.post(Config.url + Config.api.resetPassword, self.resetform.value).subscribe(data => {
			self.isLoading = false;
			if (data == 400) {
				self.invalid = true;
			} else {
				self.isSend = true;
				self.email = self.resetform.email
			}
		}, function () {
			self.invalid = true;
		});
		console.log(self.resetform.value)
	}

	resolved(captchaResponse: string) {
		this.isCapchar = true;
		console.log(`Resolved captcha with response ${captchaResponse}:`);
	}


}
