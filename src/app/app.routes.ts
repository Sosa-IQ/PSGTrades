import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
];