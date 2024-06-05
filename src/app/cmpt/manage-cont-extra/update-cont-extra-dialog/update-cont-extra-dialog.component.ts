import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConteudoExtraService } from 'src/app/services/conteudo-extra.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { contExtra, UpdateConteudoExtra } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-cont-extra-dialog',
  templateUrl: './update-cont-extra-dialog.component.html',
  styleUrls: ['./update-cont-extra-dialog.component.scss']
})
export class UpdateContExtraDialogComponent implements OnInit {
  contExtraForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateContExtraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { conteudoExtra: contExtra },
    private fb: FormBuilder,
    private conteudoExtraService: ConteudoExtraService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.contExtraForm = this.fb.group({
      ConteudoId: [this.data.conteudoExtra.ContExtraId, Validators.required],
      titulo: [this.data.conteudoExtra.titulo],
      videoUrl: [this.data.conteudoExtra.videoUrl, Validators.maxLength(355)],
      descricao: [this.data.conteudoExtra.Descricao, Validators.maxLength(200)]
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

    if (this.contExtraForm.valid) {
      const token = this.tokenService.getToken();
      const updateConteudoExtra = this.contExtraForm.getRawValue() as UpdateConteudoExtra;
      this.conteudoExtraService.editar(updateConteudoExtra, token).subscribe({
        next: (value) => {
          console.log(value);
          Toast.fire({
            icon: "success",
            title: "Conteudo Extra Atualizado com sucesso!"
          });
          this.dialogRef.close('updated');
        },
        error: (err) => {
          console.log(err);
          Toast.fire({
            icon: "error",
            title: err.error.error
          });
        }
      })
    }
  }
}
