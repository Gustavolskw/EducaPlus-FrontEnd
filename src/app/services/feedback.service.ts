import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback, FeedBackResponse, UpdateFeedBack } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl: string = "http://localhost:8080/feedback"

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(atividadeId: string): Observable<FeedBackResponse[]> {
    return this.httpClient.get<FeedBackResponse[]>(`${this.apiUrl}/${atividadeId}`)
  }

  adicionarFeedback(feedBack: Feedback, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.post<any>(`${this.apiUrl}/add`, feedBack, { headers })
  }

  updateFeedBack(updateData: UpdateFeedBack, token: string, idFeedback: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.put<any>(`${this.apiUrl}/update/${idFeedback}`, updateData, { headers });
  }

  removeFeedBack(idFeedBack: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    })
    return this.httpClient.delete<any>(`${this.apiUrl}/remove/${idFeedBack}`, { headers })
  }
}
