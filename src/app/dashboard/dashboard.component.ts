import { Component } from '@angular/core';
import { AccountlistComponent } from '../accountlist/accountlist.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { CommonModule } from '@angular/common';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccountlistComponent, FormsModule, SignUpComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public authenticator: AuthenticatorService) {
  }
  
  onBuy(orderForm: NgForm) {
    console.log('Buy Button clicked');
    if (orderForm.valid) {
      console.log("Buying", orderForm.value);
      orderForm.resetForm();
    }
  }

  onSell(orderForm: NgForm) {
    console.log('Sell Button clicked');
    if (orderForm.valid) {
      console.log("Selling", orderForm.value);
      orderForm.resetForm();
    }
  }
}
