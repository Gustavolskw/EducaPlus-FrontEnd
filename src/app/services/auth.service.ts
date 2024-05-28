import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';

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
}
