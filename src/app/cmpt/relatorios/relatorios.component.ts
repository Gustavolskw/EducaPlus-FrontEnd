import { RelatoriosService } from 'src/app/services/relatorios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {


  option!: string;

  constructor(private relatoriosService: RelatoriosService) {

  }

  changeOption(selected: string) {
    this.option = selected
  }

  gerarRelatorioDeFeedback() {
    this.relatoriosService.relatorioFeedbacks();
  }

  gerarRelatorioDeParticipacaoAlunos() {
    this.relatoriosService.relatorioParticipacao();
  }
}
