import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/AuthService';
import { TradierService } from '../services/tradier.service';

@Component({
  selector: 'app-accountlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './accountlist.component.html',
  styleUrl: './accountlist.component.css'
})
export class AccountlistComponent implements OnInit {
  constructor(private authService: AuthService) {}

  accounts: any[] = [];
  token: string | undefined;

  private tradier = inject(TradierService);

  async ngOnInit() {
    let token = await this.authService.getUserToken();
    this.token = token?.toString();
    this.loadAccounts();
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
}
