import {
  Component,
  OnInit
} from '@angular/core';

import {AppState} from '../app.service';

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
  /**
   * Set our default values
   */
  /**
   * TypeScript public modifiers
   */
  constructor(public appState: AppState) {
  }

  public ngOnInit() {
    console.log('hello `login` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

}
