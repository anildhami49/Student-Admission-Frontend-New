
import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login';
import { SignupComponent } from './signup/signup';
import { StudentFormComponent } from './student-form/student-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'students', component: StudentFormComponent }
];