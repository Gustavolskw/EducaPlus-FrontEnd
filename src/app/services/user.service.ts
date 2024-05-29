import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { userLogin, UserResponse } from '../types/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSUbject = new BehaviorSubject<UserResponse | null>(null)


  constructor(private tokenService: TokenService) {
    if (this.tokenService.istokenActive()) {
      this.decodificadorJWT()
    }
  }

  decodificadorJWT() {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token) as UserResponse
    this.userSUbject.next(user)
  }

  returnUser(): Observable<UserResponse | null> {
    return this.userSUbject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificadorJWT()
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSUbject.next(null);
  }

  islogged() {
    return this.tokenService.istokenActive();
  }
}
