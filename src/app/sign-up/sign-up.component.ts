import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule, AmplifyAuthenticatorModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  // onSubmit(signUpForm: NgForm) {
  //   console.log('Sign up clicked');
  //   if (signUpForm.valid) {
  //     console.log('Form is valid, navigating to dashboard');
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  name = '';

  formFields = {
    signUp: {
      name: {
        order: 1,
        placeholder: 'Enter your full name'
      },
      email: {
        order: 2
      },
      phone_number: {
        order: 3
      },
      'custom:token': {
        order: 4,
        label: 'Access Token',
        placeholder: 'Enter your full token',
        isRequired: true
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };
}
