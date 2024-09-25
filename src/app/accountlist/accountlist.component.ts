import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-accountlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './accountlist.component.html',
  styleUrl: './accountlist.component.css'
})
export class AccountlistComponent implements OnInit {
  accounts: string[] = [];
  data: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.httpClient
      .get('https://25ikecna96.execute-api.us-east-1.amazonaws.com/Test/accounts')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
        this.accounts = data['accounts'];
      });
  }
}
