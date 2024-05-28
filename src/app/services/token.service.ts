import { Injectable } from '@angular/core';
const KEY = "Token";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  deleteToken() {
    localStorage.removeItem(KEY);
  }

  getToken() {
    return localStorage.getItem(KEY) ?? "";
  }

  istokenActive() {
    return !!this.getToken();
  }
}
