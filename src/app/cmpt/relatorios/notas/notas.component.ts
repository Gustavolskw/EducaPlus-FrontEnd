import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from 'src/app/services/atividade.service';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { DatasAtividadesSender } from 'src/app/types/interfaces';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  dateRangeForm!: FormGroup;

  constructor(
    private relatoriosService: RelatoriosService,
    private atividadeService: AtividadeService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {


    this.initNotasForm();


  }


  initNotasForm() {
    this.dateRangeForm = this.fb.group({
      dateRange: this.fb.group({
        start: [null, Validators.required],
        end: [null, Validators.required]
      })
    });
  }


  gerarRelatorioDeNotas() {
    const startDate = this.dateRangeForm.value.dateRange.start;
    const endDate = this.dateRangeForm.value.dateRange.end;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const dataSender: DatasAtividadesSender = {
        diaInit: start.getDate(),
        diaFim: end.getDate(),
        mesInicial: start.getMonth() + 1,
        mesFinal: end.getMonth() + 1,
        anoBusca: start.getFullYear()
      };

      // Call your service with the extracted dates
      this.relatoriosService.relatorioDeNotas(dataSender);
    }
  }
}
