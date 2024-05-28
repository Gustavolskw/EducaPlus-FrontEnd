import { TokenService } from './../../../services/token.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atividade, AtividadeUpdate } from 'src/app/types/interfaces';
import { AtividadeService } from 'src/app/services/atividade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-atividade-dialog',
  templateUrl: './update-atividade-dialog.component.html',
  styleUrls: ['./update-atividade-dialog.component.scss']
})
export class UpdateAtividadeDialogComponent implements OnInit {
  atividadeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateAtividadeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { atividade: Atividade },
    private fb: FormBuilder,
    private atividadeService: AtividadeService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.atividadeForm = this.fb.group({
      idAtividade: [this.data.atividade.idAtividade, Validators.required],
      titulo: [this.data.atividade.titulo, Validators.required],
      enunciado: [this.data.atividade.enunciado, Validators.required],
      questoes: [this.data.atividade.questoes],
      resposta: [this.data.atividade.resposta]
    });


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

    if (this.atividadeForm.valid) {
      const token = this.tokenService.getToken();
      const updateAtividade = this.atividadeForm.getRawValue() as AtividadeUpdate;
      this.atividadeService.editar(updateAtividade, token).subscribe({
        next: (value) => {
          console.log(value);
          Toast.fire({
            icon: "success",
            title: "Atividade Atualizada com sucesso!"
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
