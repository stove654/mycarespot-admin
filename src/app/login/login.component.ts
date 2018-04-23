import {
	Component,
	OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Config} from '../app.config';
import {Router} from '@angular/router';

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
	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState, private http: HttpClient, private router: Router) {
	}

	public ngOnInit() {
		this.loginform = new FormGroup({
			username: new FormControl(),
			password: new FormControl()
		});
		console.log('hello `login` component');
		/**
		 * this.title.getData().subscribe(data => this.data = data);
		 */
	}

	login() {
		this.isLoading = true;
		this.http.post(Config.url + Config.api.login, this.loginform.value).subscribe(data => {
			console.log(data);
			this.isLoading = false;
			window.localStorage.setItem('auth', JSON.stringify(data));
			this.router.navigate(['home']);
			window.location.reload()
		}, function () {
			this.isLoading = false;
		});
	}

	goSignup() {
		this.router.navigate(['signup']);
	}

}
