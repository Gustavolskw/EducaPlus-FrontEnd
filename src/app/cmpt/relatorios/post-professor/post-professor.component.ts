import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from 'src/app/services/atividade.service';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { DatasAtividadesSender } from 'src/app/types/interfaces';

@Component({
  selector: 'app-post-professor',
  templateUrl: './post-professor.component.html',
  styleUrls: ['./post-professor.component.scss']
})
export class PostProfessorComponent implements OnInit {

  postDateRangeForm!: FormGroup;


  constructor(
    private relatoriosService: RelatoriosService,
    private atividadeService: AtividadeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {


    this.initPostProfessorForm();

  }

  initPostProfessorForm() {
    this.postDateRangeForm = this.fb.group({
      postDateRange: this.fb.group({
        postStart: [null, Validators.required],
        postEnd: [null, Validators.required]
      })
    });
  }



  gerarRelatorioDePostagensProfessor() {
    const startDate = this.postDateRangeForm.value.postDateRange.postStart;
    const endDate = this.postDateRangeForm.value.postDateRange.postEnd;

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
      this.relatoriosService.relatorioDePostDosProfessores(dataSender);
    }
  }
}
