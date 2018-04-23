import {
	Component,
	OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import {Config} from '../app.config';

@Component({
	/**
	 * The selector is what angular internally uses
	 * for `document.querySelectorAll(selector)` in our index.html
	 * where, in this case, selector is the string 'home'.
	 */
	selector: 'verify',  // <login></login>

	styleUrls: ['./verify.component.css'],
	templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
	verifyform: FormGroup;
	isLoading =  false;
	user = JSON.parse(window.localStorage.getItem('currentUser'));
	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState,  private http: HttpClient, private router: Router) {
	}

	public ngOnInit() {
		this.verifyform = new FormGroup({
			code: new FormControl()
		});
		console.log('hello `verify` component');
		/**
		 * this.title.getData().subscribe(data => this.data = data);
		 */
	}

	private verify() {
		let user = JSON.parse(window.localStorage.getItem('currentUser'));
		console.log(user)
		let params = {
			code: this.verifyform.value.code,
			authyId: user.authyId,
			realPhone: user.realPhone,
			countryCode: user.countryCode,
			_id: user._id
		};

		this.http.post(Config.url + Config.api.auth, params).subscribe(data => {

			window.localStorage.setItem('auth', JSON.stringify(data));
			this.router.navigate(['home']);
			window.location.reload();
			console.log(data);
		});
		console.log(params)
	}

}
