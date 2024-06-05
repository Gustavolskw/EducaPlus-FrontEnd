import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RespostaAtividadeService } from 'src/app/services/resposta-atividade.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { RespostaAtividadeResolvida } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { PostaNotaDialogComponent } from './posta-nota-dialog/posta-nota-dialog.component';

@Component({
  selector: 'app-form-posta-nota-avaliacao',
  templateUrl: './form-posta-nota-avaliacao.component.html',
  styleUrls: ['./form-posta-nota-avaliacao.component.scss']
})
export class FormPostaNotaAvaliacaoComponent implements OnInit {

  listaAtividadesResolvidas!: RespostaAtividadeResolvida[];
  semAtividadesResolvidas!: boolean
  userRole!: number | null;
  userId!: number | null
  mensagemErro: string = "";

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private respostaService: RespostaAtividadeService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.buscaUser();

  }


  buscaUser() {
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
        this.userRole = user ? user.role : null
        this.userId = user ? user.id : null
        this.buscaTodasAtividades(this.userRole);
      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    })
  }






  buscaTodasAtividades(role: number | null) {

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

    if (role === 0) {
      this.respostaService.listarRespostasDeAtividade().subscribe({
        next: (listaDeRespostas) => {
          if (listaDeRespostas.length === 0) {
            this.listaAtividadesResolvidas = [];
            this.semAtividadesResolvidas = true;
            this.mensagemErro = "Sem Atividades Resolvidas para Avaliar"
          } else {
            this.listaAtividadesResolvidas = listaDeRespostas;
            this.semAtividadesResolvidas = false;
          }
        },
        error: (err) => {
          Toast.fire({
            icon: "error",
            title: err.error.error
          });
        }
      })
    } else if (role === 1) {
      if (this.userId)
        this.respostaService.listaRespostaPeloProfessor(this.userId).subscribe({
          next: (listaDeRespostasPeloProfessor) => {
            if (listaDeRespostasPeloProfessor.length === 0) {
              this.listaAtividadesResolvidas = [];
              this.semAtividadesResolvidas = true;
              this.mensagemErro = "Sem Atividades Resolvidas para Avaliar da materia do professor"
            } else {
              this.listaAtividadesResolvidas = listaDeRespostasPeloProfessor;
              this.semAtividadesResolvidas = false;
            }
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

  openDialog(resposta: RespostaAtividadeResolvida, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(PostaNotaDialogComponent, {
      data: { resposta },
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.buscaTodasAtividades(this.userRole);
      }
    });
  }








}
