/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

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
        <nav class="menuGen Hlogin">
          <ul>
            <li><a>Sign up</a></li><!--
            --><li><a class="current">Log In</a></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main>
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

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
