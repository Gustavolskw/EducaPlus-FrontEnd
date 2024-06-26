import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { EditUser, userLogin, UserResponse, Usuario } from '../types/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "http://localhost:8080"



  private userSUbject = new BehaviorSubject<UserResponse | null>(null)


  constructor(private tokenService: TokenService,
    private http: HttpClient
  ) {
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

  listaTodosUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/auth/usuarios`);
  }

  buscaUserPorId(userId: number | null): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/auth/usuarios/${userId}`);
  }

  inativaUser(userId: number | null, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.delete<any>(`${this.apiUrl}/auth/inativa/${userId}`, { headers });
  }

  retivaUser(userId: number | null, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.http.post<any>(`${this.apiUrl}/auth/reativa/${userId}`, '', { headers });
  }
  editaUsuario(login: string | null, senha: string | null, userId: number | null): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/auth/update/${userId}`, {
      login: login,
      newSenha: senha
    });
  }

}
