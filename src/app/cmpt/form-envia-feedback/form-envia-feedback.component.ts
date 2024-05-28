import { FeedbackService } from './../../services/feedback.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { Feedback } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-envia-feedback',
  templateUrl: './form-envia-feedback.component.html',
  styleUrls: ['./form-envia-feedback.component.scss']
})
export class FormEnviaFeedbackComponent implements OnInit {

  feedbackForm!: FormGroup;
  @Input() userId!: number | null;
  @Input() atividadeId!: string | null;
  @Output() enviaFeedBack = new EventEmitter();
  token!: string;

  constructor(private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private tokenService: TokenService
  ) {

  }


  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      atividade: [this.atividadeId],
      experiencia: [null, Validators.required],
      opiniao: [null, Validators.required],
      user: [this.userId]
    });
    this.token = this.tokenService.getToken();
  }

  enviarFeedBack() {
    if (this.userId && this.atividadeId) {
      const novoFeedBack = this.feedbackForm.getRawValue() as Feedback;
      this.feedbackService.adicionarFeedback(novoFeedBack, this.token).subscribe({
        next: (success) => {
          Swal.fire({
            icon: 'success',
            title: 'FeedBack Enviado!',
            text: success.reposnseMessage,
          });
          this.enviaFeedBack.emit();
          this.feedbackForm.reset()
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao Enviar Feedback!',
            text: err.error.error,
          });
          this.enviaFeedBack.emit();
          this.feedbackForm.reset()
        }
      })
    }

  }






}
