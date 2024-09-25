import { Component } from '@angular/core';
import { AccountlistComponent } from '../accountlist/accountlist.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccountlistComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
