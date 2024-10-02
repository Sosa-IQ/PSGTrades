import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const BASE_URL = 'https://api.tradier.com/v1/user/profile'

@Injectable({
  providedIn: 'root'
})
export class TradierService {
  private http = inject(HttpClient)
  constructor() { }

  getAccounts(token: string | undefined){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    return this.http.get(BASE_URL, { headers })
  }

  postOrder(username: string | undefined, symbol: string | undefined, side: string | undefined, account_id: string | undefined){
    const body = {
      'username': username,
      'account_id': account_id,
      'symbol': symbol,
      'side': side
    }
    return lastValueFrom(this.http.post(
      `https://wzbaegm1o9.execute-api.us-east-1.amazonaws.com/testing/order`,
      body
    ));
  }
}
