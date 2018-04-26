import {
	Component,
	OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Config} from '../app.config';
import {Router} from '@angular/router';
let self;
@Component({
	/**
	 * The selector is what angular internally uses
	 * for `document.querySelectorAll(selector)` in our index.html
	 * where, in this case, selector is the string 'home'.
	 */
	selector: 'login',  // <login></login>

	styleUrls: ['./login.component.css'],
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	loginform: FormGroup;
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
		self = this;
	}

	public ngOnInit() {
		this.loginform = new FormGroup({
			email: new FormControl(),
			password: new FormControl()
		});
		console.log('hello `login` component');
		/**
		 * this.title.getData().subscribe(data => this.data = data);
		 */
	}

	login() {
		this.isLoading = true;
		self.invalid = false;

		this.http.post(Config.url + Config.api.login, this.loginform.value).subscribe(res => {
			this.isLoading = false;
			let data = <any>res;
			console.log(data);
			if (data) {
				if (data.success) {
					if (!data.user.verifyEmail) {
						this.isVerifyEmail = true;
					} else if (!data.user.verifyPhone) {
						this.http.post(Config.url + Config.api.requestCode, {
							_id: data.user._id
						}).subscribe(data => {

						}, function () {

						});
						this.router.navigate(['verify']);
					} else if (data.user.verifyEmail && data.user.verifyPhone) {
						console.log(data);
						window.localStorage.setItem('auth', JSON.stringify(data));
						this.router.navigate(['home']);
						window.location.reload()
					}
				} else {
					this.invalid = true;

				}

			}

		}, function () {
			console.log('11111')
			self.isLoading = false;
			self.invalid = true;

		});
	}

	goSignup() {
		this.router.navigate(['signup']);
	}

}
