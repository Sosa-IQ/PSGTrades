import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const BASE_URL = '/api/user/profile'

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

  postOrder(token: string | undefined, symbol: string | undefined, side: string | undefined, account_id: string | undefined){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    const body = {
      'class': 'equity',
      'symbol': `${symbol}`,
      'side': `${side}`,
      'quantity': '1',
      'type': 'market',
      'duration': 'day'
    }
    return this.http.post(
      `/api/accounts/${account_id}/orders`,
      body,
      { headers }
    );
  }
}
