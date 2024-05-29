import { UserService } from 'src/app/services/user.service';
import { NotaPostUpdate, userLogin } from './../../../types/interfaces';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotaService } from 'src/app/services/nota.service';
import { TokenService } from 'src/app/services/token.service';
import { NotaBusca } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-notas-dialog',
  templateUrl: './update-notas-dialog.component.html',
  styleUrls: ['./update-notas-dialog.component.scss']
})
export class UpdateNotasDialogComponent {
  NotasUpdateForm!: FormGroup;
  userId!: number | null;

  constructor(
    public dialogRef: MatDialogRef<UpdateNotasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nota: NotaBusca },
    private fb: FormBuilder,
    private notaService: NotaService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserId();

    this.NotasUpdateForm = this.fb.group({
      nota: [this.data.nota.nota],
      avaliador: [this.userId],
    });

  }

  getUserId() {
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

    this.userService.returnUser().subscribe({
      next: (user) => {
        this.userId = user ? user?.id : null;
        console.log(this.userId);
      },
      error: (err) => {
        Toast.fire({
          icon: "success",
          title: err.error.error
        });
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

    if (this.NotasUpdateForm.valid) {
      const token = this.tokenService.getToken();
      const notaUpdate = this.NotasUpdateForm.getRawValue() as NotaPostUpdate;
      this.notaService.editarNota(this.data.nota.idNota, notaUpdate, token).subscribe({
        next: (value) => {
          Toast.fire({
            icon: "success",
            title: "Nota Atualizada com sucesso!"
          });
          this.dialogRef.close('updated');
        },
        error: (err) => {
          Toast.fire({
            icon: "error",
            title: err.error.error
          });
          this.dialogRef.close('updated');
        }
      })
    }
  }
}
