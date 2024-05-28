import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespostaAtividadeService } from 'src/app/services/resposta-atividade.service';
import { UserService } from 'src/app/services/user.service';
import { atividadeResponse } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-envia-resposta',
  templateUrl: './form-envia-resposta.component.html',
  styleUrls: ['./form-envia-resposta.component.scss']
})
export class FormEnviaRespostaComponent implements OnInit {
  @Input() idAtividade!: string | null;
  @Input() tipoAtividade!: number;
  tipoDeAtividade!: "Multipla Escolha" | "Descritiva";
  userId!: number | null;
  respostaForm!: FormGroup;
  @Output() respostaEnviada = new EventEmitter<any>()


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private respostaService: RespostaAtividadeService
  ) { }

  ngOnInit(): void {
    this.userService.returnUser().subscribe({
      next: (user) => {
        this.userId = user ? user?.id : null;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao Autenticar Usuario!',
          text: err.error.error,
        });
      }
    })

    this.respostaForm = this.formBuilder.group({
      resposta: [null, [Validators.required, Validators.maxLength(200)]],
      usuario: [this.userId]
    });
  }



  async enviaResposta() {
    if (this.idAtividade) {
      const novaResposta = this.respostaForm.getRawValue() as atividadeResponse
      const { value: accept } = await Swal.fire({
        title: "Termo de Envio de Resposta",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: `
    Tenho Certeza que desejo enviar a resposta!
  `,
        confirmButtonText: `
    Enviar&nbsp;<i class="fa fa-arrow-right"></i>
  `,
        inputValidator: (result) => {
          return !result && "Precisa aceitar o termo de Envio";
        }
      });
      if (accept) {
        this.respostaService.postar(novaResposta, this.idAtividade).subscribe({
          next: (success) => {
            console.log(success);
            Swal.fire({
              icon: 'success',
              title: 'Erro ao Autenticar Usuario!',
              text: success.reposnseMessage,
            });
            this.respostaEnviada.emit();
            this.respostaForm.reset();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Enviar Resposta!',
              text: err.error.error,
            });
            this.respostaEnviada.emit();
            this.respostaForm.reset();
          }
        })
      }
    }
  }








}
