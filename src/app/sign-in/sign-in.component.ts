import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private router: Router) {}
  
  onSubmit(signInForm: NgForm) {
    console.log('Sign in clicked');
    if (signInForm.valid) {
      console.log('Form is valid, navigating to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }
}
