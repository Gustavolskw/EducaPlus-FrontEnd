import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { atividadeResponse } from '../types/interfaces';

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

  /*
  mais tarde para administração implementar
  listar() {
    return this.httpClient.get<>
  }*/
}
