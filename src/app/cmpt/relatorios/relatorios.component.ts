import { RelatoriosService } from 'src/app/services/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { AtividadeService } from 'src/app/services/atividade.service';
import { DatasAtividades, DatasAtividadesSender } from 'src/app/types/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  option!: string;
  listaDeDatasDeAtividades: DatasAtividades[] = [];



  constructor(
    private relatoriosService: RelatoriosService,
    private atividadeService: AtividadeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.option = 'exp-alunos';
  }

  changeOption(selected: string) {
    this.option = selected;
  }

  gerarRelatorioDeFeedback() {
    this.relatoriosService.relatorioFeedbacks();
  }

  gerarRelatorioDeParticipacaoAlunos() {
    this.relatoriosService.relatorioParticipacao();
  }

}
