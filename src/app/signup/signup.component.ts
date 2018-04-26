import {
	Component,
	OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Config} from '../app.config';
import { Router } from '@angular/router';

@Component({
	/**
	 * The selector is what angular internally uses
	 * for `document.querySelectorAll(selector)` in our index.html
	 * where, in this case, selector is the string 'home'.
	 */
	selector: 'signup',  // <login></login>

	styleUrls: ['./signup.component.css'],
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

	userform: FormGroup;
	isLoading = false;
	isVerifyEmail = false;
	invalid = false;
	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState, private http: HttpClient, private router: Router) {
		console.log(Config);
	}

	public ngOnInit() {
		this.userform = new FormGroup({
			email: new FormControl(),
			password: new FormControl(),
			phone: new FormControl(),
			lastName: new FormControl(),
			firstName: new FormControl(),
		});


	}

	signup () {
		console.log(this.userform.value)
		let data = this.userform.value;
		data.realPhone = data.phone;
		if (data.phone[0] == 0) {
			data.phone = data.phone.substr(1);
		}
		data.countryCode = '+84';
		data.phone = data.countryCode + data.phone;
		this.isLoading = true;
		this.invalid = false;
		this.http.post(Config.url + Config.api.user, data).subscribe(data => {
			this.isLoading = false;
			console.log(data);
			window.localStorage.setItem('auth', JSON.stringify({
				user: data,
				token: null
			}));
			
			let dataUser = <any>data;
			if (data == 422) {
				this.invalid = true;
				return;
			}
			if (!dataUser.verifyEmail) {
				this.isVerifyEmail = true;
			} else {
				this.router.navigate(['verify']);
			}
		});
	}

}
