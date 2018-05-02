import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { NoContentComponent } from './no-content';
import {VerifyComponent} from './verify';
import {EmailComponent} from './email';
import {ForgotPasswordComponent} from './forgot-password';
import {ConfirmResetPasswordComponent} from './confirm-reset-password';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'verify',  component: VerifyComponent },
  { path: 'email',  component: EmailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'confirm-reset-password', component: ConfirmResetPasswordComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
