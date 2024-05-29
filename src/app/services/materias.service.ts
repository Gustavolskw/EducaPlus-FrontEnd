import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { materia } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiUrl: string = "http://localhost:8080/materia"

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<materia[]> {
    return this.httpClient.get<materia[]>(`${this.apiUrl}/all`)
  }
  listaMateriaPorUserid(userId: number): Observable<materia> {
    return this.httpClient.get<materia>(`${this.apiUrl}/user/${userId}`);
  }


  listarMateriasComAtividade(): Observable<materia[]> {
    return this.httpClient.get<materia[]>(`${this.apiUrl}/atividade`);
  }

  listarMateriasComContExtra(): Observable<materia[]> {
    return this.httpClient.get<materia[]>(`${this.apiUrl}/cont-extra`)
  }
  listarMateriasComNotas(): Observable<materia[]> {
    return this.httpClient.get<materia[]>(`${this.apiUrl}/notas`)
  }
}

