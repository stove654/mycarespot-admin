import {
	Component,
	OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import {Config} from '../app.config';

@Component({
	/**
	 * The selector is what angular internally uses
	 * for `document.querySelectorAll(selector)` in our index.html
	 * where, in this case, selector is the string 'home'.
	 */
	selector: 'email',  // <login></login>

	styleUrls: ['./email.component.css'],
	templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
	isVerifyEmail = false;
	/**
	 * Set our default values
	 */
	/**
	 * TypeScript public modifiers
	 */
	constructor(public appState: AppState,  private http: HttpClient, private router: Router) {
	}

	public ngOnInit() {
		function gup( name, url ) {
			if (!url) url = location.href;
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			let regexS = "[\\?&]"+name+"=([^&#]*)";
			let regex = new RegExp( regexS );
			let results = regex.exec( url );
			return results == null ? null : results[1];
		}

		const token = gup('token', window.location);
		console.log(token, Config.url + Config.api.verifyEmail);
		this.http.post(Config.url + Config.api.verifyEmail, {
			token: token
		}).subscribe(data => {
			console.log(data)
			window.localStorage.setItem('auth', JSON.stringify({
				user: data,
				token: token
			}));
			this.isVerifyEmail = true;
			setTimeout(() => {
				this.router.navigate(['verify']);
			}, 4000)
		}, function () {
		});
		/**
		 * this.title.getData().subscribe(data => this.data = data);
		 */
	}



}
