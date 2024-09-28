import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { TradierService } from '../services/tradier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  constructor(private authService: AuthService) {}

  private tradier = inject(TradierService);
  
  token: string | undefined;
  accounts: any[] = [];
  orderStatuses: { account_id: string, message: string, success: boolean}[] = [];

  async ngOnInit() {
    let token = await this.authService.getUserToken();
    this.token = token?.toString();
    this.loadAccounts();
    // this.orderStatuses.push({
    //   account_id: 'test',
    //   message: 'message',
    //   success: true
    // });
  }

  onBuy(orderForm: NgForm) {
    console.log('Buy Button clicked');
    if (orderForm.valid) {
      let symbol = orderForm.value['stock-symbol']
      const confirmed = window.confirm(`Confirm buy order for ${symbol}`)
      if (confirmed) {
        this.createOrder(symbol, 'buy')
        orderForm.resetForm();
      }
    }
  }

  onSell(orderForm: NgForm) {
    console.log('Sell Button clicked');
    if (orderForm.valid) {
      console.log("Selling", orderForm.value);
      let symbol = orderForm.value['stock-symbol']
      const confirmed = window.confirm(`Confirm sell order for ${symbol}`)
      if (confirmed) {
        this.createOrder(symbol, 'sell')
        orderForm.resetForm();
      }
    }
  }

  loadAccounts() {
    this.tradier.getAccounts(this.token)
    .subscribe((data: any) => {
      if (data && data.profile && data.profile.account) {
        this.accounts = data['profile']['account']
        // sort by creation date
        this.accounts.sort((a, b) => {
          return new Date(a.date_created).getTime() - new Date(b.date_created).getTime();
        });
      } else {
        console.error("Error fetching accounts")
      }
    })
  }

  createOrder(symbol: string | undefined, side: string | undefined){
    this.orderStatuses = []; // Reset order statuses
    for (let account of this.accounts) {
      let account_id = account.account_number;
      this.tradier.postOrder(this.token, symbol, side, account_id)
      .subscribe((response: any) => {
        if (response && response.order && response.order.status === 'ok') {
          console.log(`${side?.toUpperCase()} order placed successfully for account ${account_id}`);
          this.orderStatuses.push({
            account_id,
            message: `${account_id}: ${side?.toUpperCase()} order successful`,
            success: true
          });
        } else {
          console.error(`${side?.toUpperCase()} order failed for account ${account_id}:`, response);
          this.orderStatuses.push({
            account_id,
            message: `${account_id}: ${side?.toUpperCase} order failed`,
            success: false
          });
        }
      },
      (error: any) => {
        console.error(`Error placing ${side?.toUpperCase()} order for account ${account_id}:`, error);
        this.orderStatuses.push({
          account_id,
          message: `${account_id}: ${side?.toUpperCase()} order failed - ${error.status} ${error.statusText}`,
          success: false
        })
      }
    );
    }
  }
}
