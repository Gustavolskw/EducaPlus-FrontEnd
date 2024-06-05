import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaBusca, NotaPostUpdate } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiUrl: string = "http://localhost:8080/atividade/nota"
  constructor(private httpClient: HttpClient) { }


  listaTodas(): Observable<NotaBusca[]> {
    return this.httpClient.get<NotaBusca[]>(`${this.apiUrl}/all`);
  }

  listarPorUser(userId: number): Observable<NotaBusca[]> {
    return this.httpClient.get<NotaBusca[]>(`${this.apiUrl}/${userId}`);
  }

  listarTodasNotasPorMateria(materia: string): Observable<NotaBusca[]> {
    return this.httpClient.get<NotaBusca[]>(`${this.apiUrl}/materia/${materia}`);
  }

  editarNota(notaId: number, updateNota: NotaPostUpdate, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.put<any>(`${this.apiUrl}/update/${notaId}`, updateNota, { headers });
  }

  postarNota(novaNota: NotaPostUpdate, respostaId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.post<any>(`${this.apiUrl}/add/${respostaId}`, novaNota, { headers });
  }
}
