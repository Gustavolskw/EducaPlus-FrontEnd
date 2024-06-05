import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { atividadeResponse, RespostaAtividadeResolvida } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RespostaAtividadeService {

  private apiUrl: string = "http://localhost:8080/atividade/resposta"
  ///send/{idAtividade}

  constructor(private httpClient: HttpClient) { }


  postar(resposta: atividadeResponse, idAtividade: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/send/${idAtividade}`, resposta)
  }

  listarRespostasDeAtividade(): Observable<RespostaAtividadeResolvida[]> {
    return this.httpClient.get<RespostaAtividadeResolvida[]>(`${this.apiUrl}/all`);
  }

  listaRespostaPeloProfessor(idProfessor: number): Observable<RespostaAtividadeResolvida[]> {
    return this.httpClient.get<RespostaAtividadeResolvida[]>(`${this.apiUrl}/prof/${idProfessor}`);
  }

  listarRespostasDeAtividadePorAtividade(atividadeId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/all`);
  }

}
