import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
}
