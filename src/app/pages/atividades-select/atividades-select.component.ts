import { UpdateFeedBack } from './../../types/interfaces';
import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Atividade, FeedBackResponse } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { CardFeedbackComponent } from 'src/app/cmpt/card-feedback/card-feedback.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

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
  atividadeId!: string
  abrirResposta: boolean = false;
  enviarFeedbackInput: boolean = false;
  tipoAtividadeRecebida!: number;
  tipoDeAtividade!: "Multipla Escolha" | "Descritiva";



  UpdateFeedBack: string = "";
  semFeedback: boolean = true;
  @ViewChild(CardFeedbackComponent) feedbackComponent!: CardFeedbackComponent;
  feedbacksLista: FeedBackResponse[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private atividadeService: AtividadeService,
    private userService: UserService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.checkSession();
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id)
      this.atividadeId = id;

    this.atividadeService.listarPorId(id).subscribe({
      next: (atividadeEnc) => {
        this.atividade = atividadeEnc;
        this.tipoAtividadeRecebida = atividadeEnc.tipoAtividade;
        this.tipoDeAtividade = atividadeEnc.tipoAtividade == 0 ? "Descritiva" : "Multipla Escolha";
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar atividade',
          text: error.error.error,
        });
      }
    });

    this.userService.returnUser().subscribe(user => {
      this.userName = user ? user.sub : null;
      this.userId = user ? user.id : null;
      this.role = user ? user.role : null;
    });
    this.buscaFeedbacks();

  }
  checkSession() {
    this.authService.isAuthenticated(this.tokenService.getToken()).subscribe({
      error: (erro) => {
        console.log(erro);
        if (erro.status === 500) {
          this.userService.logout();
        }
      }
    })
  }

  buscaFeedbacks() {
    this.feedbackService.listar(this.atividadeId).subscribe({
      next: (feedbacks) => {
        if (feedbacks) {
          this.feedbacksLista = feedbacks;
          this.semFeedback = false
        } else {
          this.feedbacksLista = [];
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status === 404) {
          this.feedbacksLista = [];
          this.semFeedback = true
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao buscar feedbacks',
            text: err.error.error,
          });
          this.buscaFeedbacks();
        }
      }
    });
  }

  responder() {
    this.abrirResposta = !this.abrirResposta;
    this.enviarFeedbackInput = false;
  }

  enviarFeedback() {
    this.enviarFeedbackInput = !this.enviarFeedbackInput;
    this.abrirResposta = false;
  }

  respotaEnvidaPeloUser() {
    this.abrirResposta = false;
  }
  feedbackEnviadoPeloUser() {
    this.enviarFeedbackInput = !this.enviarFeedbackInput;
    this.abrirResposta = false;
    this.feedbacksLista = [];
    this.buscaFeedbacks();
  }
  feedbackRemovido() {
    this.feedbacksLista = [];
    if (this.feedbacksLista.length == 0) {
      this.semFeedback = true;
    }
    this.buscaFeedbacks();
  }
}
