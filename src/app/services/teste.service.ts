import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  private apiUrl: string = "http://localhost:8080/teste"
  constructor(private httpClient: HttpClient) { }


  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`)
  }
}
