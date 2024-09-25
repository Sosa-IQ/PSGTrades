import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accountlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountlist.component.html',
  styleUrl: './accountlist.component.css'
})
export class AccountlistComponent {
  accounts: string[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.accounts.push(`Account ${i}`);
    }
  }
}
