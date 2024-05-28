import { AtividadeService } from 'src/app/services/atividade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { CardFeedbackComponent } from 'src/app/cmpt/card-feedback/card-feedback.component';

@Component({
  selector: 'app-atividades-select',
  templateUrl: './atividades-select.component.html',
  styleUrls: ['./atividades-select.component.scss']
})
export class AtividadesSelectComponent implements OnInit {

  atividade: Atividade | null = null;
  userName: string | null = null;
  userId: number | null = null;
  role: number | null = null;
  atividadeId!: string | null;
  semFeedback: boolean = false;
  abrirResposta: boolean = false;
  enviarFeedbackInput: boolean = false;
  tipoAtividadeRecebida!: number;
  tipoDeAtividade!: "Multipla Escolha" | "Descritiva";
  @ViewChild(CardFeedbackComponent) cardFeedbackComponent!: CardFeedbackComponent;




  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private atividadeService: AtividadeService,
    private userService: UserService,
    private feedbackService: FeedbackService
  ) {

  }
  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get("id");

    this.atividadeId = id;

    this.atividadeService.listarPorId(id).subscribe({
      next: (atividadeEnc) => {
        this.atividade = atividadeEnc;
        this.tipoAtividadeRecebida = atividadeEnc.tipoAtividade
        if (atividadeEnc.tipoAtividade == 0) {
          this.tipoDeAtividade = "Descritiva"
        } else {
          this.tipoDeAtividade = "Multipla Escolha"
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: error.error.error,
        });
      }
    })

    this.userService.returnUser().subscribe(user => {
      this.userName = user ? user.sub : null;
      this.userId = user ? user?.id : null;
      this.role = user ? user?.role : null;
    });

  }

  responder() {
    if (this.abrirResposta == false) {
      this.abrirResposta = true;
      this.enviarFeedbackInput = false;
    } else {
      this.abrirResposta = false;
    }

  }
  enviarFeedback() {
    if (this.enviarFeedbackInput == false) {
      this.enviarFeedbackInput = true;
      this.abrirResposta = false;
    } else {
      this.enviarFeedbackInput = false;
    }
  }

  respotaEnvidaPeloUser() {
    this.abrirResposta = false;
  }

  feedbackEnviado() {
    this.cardFeedbackComponent.buscaFeedbacks();
    this.enviarFeedbackInput = false;
  }
}




