import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atividade, AtividadeCadastro, AtividadeUpdate } from '../types/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private apiUrl: string = "http://localhost:8080/atividade"

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Atividade[]> {
    return this.httpClient.get<Atividade[]>(`${this.apiUrl}/list`)
  }

  listarPorId(id: string | null): Observable<Atividade> {
    return this.httpClient.get<Atividade>(`${this.apiUrl}/list/${id}`)
  }

  adicionar(atividade: AtividadeCadastro, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.httpClient.post<any>(`${this.apiUrl}/add`, atividade, { headers });
  }

  remover(atividadeId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this.httpClient.delete<any>(`${this.apiUrl}/remove/${atividadeId}`, { headers });
  }
  editar(atividadeUpdate: AtividadeUpdate, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.httpClient.put<any>(`${this.apiUrl}/update`, atividadeUpdate, { headers });
  }

}
