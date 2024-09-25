import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private router: Router) {}
  
  onSubmit(signUpForm: NgForm) {
    console.log('Sign up clicked');
    if (signUpForm.valid) {
      console.log('Form is valid, navigating to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }
}
