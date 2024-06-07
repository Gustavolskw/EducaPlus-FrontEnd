import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { DatasAtividadesSender } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl: string = "http://localhost:8080/relatorios"

  constructor(private httpClient: HttpClient) { }
  relatorioFeedbacks() {
    this.httpClient.get(`${this.apiUrl}/feedbacks`, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const filename = `Relatorio_de_Feedbacks_${new Date().toISOString().slice(0, 10)}.pdf`;
          saveAs(blob, filename);
        },
        error: (error) => {
          console.error('Erro ao baixar o PDF', error);
        }
      });
  }

  relatorioParticipacao() {
    this.httpClient.get(`${this.apiUrl}/alunos/parti`, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const filename = `Relatorio_de_Participacao_Alunos_${new Date().toISOString().slice(0, 10)}.pdf`;
          saveAs(blob, filename);
        },
        error: (error) => {
          console.error('Erro ao baixar o PDF', error);
        }
      });
  }
  relatorioDeNotas(datas: DatasAtividadesSender) {
    const params = new HttpParams()
      .set('diaInit', datas.diaInit.toString())
      .set('diaFim', datas.diaFim.toString())
      .set('mesInicial', datas.mesInicial.toString())
      .set('mesFinal', datas.mesFinal.toString())
      .set('anoBusca', datas.anoBusca.toString());

    this.httpClient.get(`${this.apiUrl}/alunos/notas`, { params, responseType: 'blob' })
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const filename = `Relatorio_de_Notas_${new Date().toISOString().slice(0, 10)}.pdf`;
          saveAs(blob, filename);
        },
        error: (error) => {
          console.error('Erro ao baixar o PDF', error);
        }
      });
  }


  relatorioDePostDosProfessores(datas: DatasAtividadesSender) {
    const params = new HttpParams()
      .set('diaInit', datas.diaInit.toString())
      .set('diaFim', datas.diaFim.toString())
      .set('mesInicial', datas.mesInicial.toString())
      .set('mesFinal', datas.mesFinal.toString())
      .set('anoBusca', datas.anoBusca.toString());

    this.httpClient.get(`${this.apiUrl}/posts/atividades`, { params, responseType: 'blob' })
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const filename = `Relatorio_de_Post_Atividades_${new Date().toISOString().slice(0, 10)}.pdf`;
          saveAs(blob, filename);
        },
        error: (error) => {
          console.error('Erro ao baixar o PDF', error);
        }
      });
  }
}
