import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
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
