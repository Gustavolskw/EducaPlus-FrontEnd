import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../types/interfaces';

interface authResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient,
    private userService: UserService
  ) { }


  atenticate(login: string, senha: string): Observable<HttpResponse<authResponse>> {
    return this.http.post<authResponse>(`${this.apiUrl}/auth/login`, {
      login: login,
      senha: senha
    }, { observe: "response" }).pipe(
      tap((response) => {
        const authToken = response.body?.token || "";
        this.userService.salvarToken(authToken);
      })
    )
  }

  isAuthenticated(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.get<any>(`${this.apiUrl}/teste/token`, { headers })
  }

  updateAuth(login: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/update/login`, {
      login: login,
      senha: senha
    });
  }


}
