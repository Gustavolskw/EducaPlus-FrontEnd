import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroUserAnalise, UserAnalise } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserAnaliseService {

  private apiUrl: string = "http://localhost:8080/newUser"

  constructor(private http: HttpClient) { }


  cadastrar(user: CadastroUserAnalise): Observable<any> {
    return this.http.post<CadastroUserAnalise>(`${this.apiUrl}/register`, user)
  }

  aprovar(id: number, token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.post<any>(`${this.apiUrl}/analise/aprove/${id}`, null, { headers })
  }

  buscarFila(): Observable<UserAnalise[]> {
    return this.http.get<UserAnalise[]>(`${this.apiUrl}/analise/list`)
  }

  reprovarUsuario(id: number, token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.http.delete<any>(`${this.apiUrl}/analise/remove/${id}`, { headers })
  }
}
