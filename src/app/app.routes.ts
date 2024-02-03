import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { IndexComponent } from './user/index/index.component';
import { LandingComponent } from './user/landing/landing.component';

export const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'home', component: IndexComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];
