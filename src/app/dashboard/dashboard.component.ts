import { Component } from '@angular/core';
import { AccountlistComponent } from '../accountlist/accountlist.component';
import { AuthComponent } from "../auth/auth.component";
import { CommonModule } from '@angular/common';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { OrderComponent } from "../order/order.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccountlistComponent, AuthComponent, CommonModule, OrderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public authenticator: AuthenticatorService) {
  }
}
