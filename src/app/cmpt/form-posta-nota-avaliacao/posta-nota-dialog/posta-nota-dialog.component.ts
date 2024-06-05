import { NotaService } from './../../../services/nota.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formValidators } from 'src/app/form-Validator';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { NotaPostUpdate, RespostaAtividadeResolvida } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posta-nota-dialog',
  templateUrl: './posta-nota-dialog.component.html',
  styleUrls: ['./posta-nota-dialog.component.scss']
})
export class PostaNotaDialogComponent {
  avaliacaoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostaNotaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resposta: RespostaAtividadeResolvida },
    private fb: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService,
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.avaliacaoForm = this.fb.group({
      nota: [null, [Validators.required, formValidators.notaValid()]],
      avaliador: [null, Validators.required]

    });
    console.log(this.data.resposta.enunciado);
    this.buscaUser();
    console.log(this.avaliacaoForm.get('avaliador')?.value);

  }

  buscaUser() {
    this.userService.returnUser().subscribe({
      next: (user) => {
        const userId = user?.id
        this.avaliacaoForm.patchValue({ avaliador: userId })
      },
      error: (err) => {

      }
    })
  }


  enviaUpdate() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.avaliacaoForm.valid) {
      const token = this.tokenService.getToken();
      const notaAtividade = this.avaliacaoForm.getRawValue() as NotaPostUpdate;
      this.notaService.postarNota(notaAtividade, this.data.resposta.idResposta, token).subscribe({
        next: (value) => {
          console.log(value);
          Toast.fire({
            icon: "success",
            title: "Resposta Avaliada com sucesso!"
          });
          this.dialogRef.close('updated');
        },
        error: (err) => {
          Toast.fire({
            icon: "error",
            title: err.error.error
          });
        }
      })
    }

  }
}
