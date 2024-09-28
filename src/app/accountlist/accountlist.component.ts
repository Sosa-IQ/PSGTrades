import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-accountlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './accountlist.component.html',
  styleUrl: './accountlist.component.css'
})
export class AccountlistComponent implements OnInit {
  accounts: any[] = [];
  token: string | undefined;

  httpClient = inject(HttpClient);

  async ngOnInit() {
    let token = await this.authService.getUserToken();
    this.token = token?.toString();
    this.fetchAccounts();
  }
  constructor(private authService: AuthService) {}

  fetchAccounts() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
    this.httpClient
      .get('https://api.tradier.com/v1/user/profile', { headers })
      .subscribe((data: any) => {
        console.log(data);
        console.log(data['profile']['account']);
        this.accounts = data['profile']['account'];
      });
  }
}
