import { Injectable } from '@angular/core';
import { contExtra, UpdateConteudoExtra } from '../types/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConteudoExtraService {

  private apiUrl: string = "http://localhost:8080/conteudo/extra"

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<contExtra[]> {
    return this.httpClient.get<contExtra[]>(`${this.apiUrl}/list`)
  }

  remover(contExtraId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.delete<any>(`${this.apiUrl}/remove/${contExtraId}`, { headers });
  }

  editar(updateContExtra: UpdateConteudoExtra, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.put<any>(`${this.apiUrl}/update`, updateContExtra, { headers });
  }

  postar(conteudoExtra: contExtra, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.post<any>(`${this.apiUrl}/add`, conteudoExtra, { headers })
  }

}
