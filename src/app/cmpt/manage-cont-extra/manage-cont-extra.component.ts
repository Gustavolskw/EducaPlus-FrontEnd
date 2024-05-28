import { ConteudoExtraService } from 'src/app/services/conteudo-extra.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MateriasService } from 'src/app/services/materias.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { contExtra, materia } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { UpdateContExtraDialogComponent } from './update-cont-extra-dialog/update-cont-extra-dialog.component';

@Component({
  selector: 'app-manage-cont-extra',
  templateUrl: './manage-cont-extra.component.html',
  styleUrls: ['./manage-cont-extra.component.scss']
})
export class ManageContExtraComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  todas: materia = { 'materiaName': 'TODOS', 'materiaId': 100 }
  userRole!: number | null;
  userName!: string | null;
  token!: string;
  semContExtra: boolean = true;
  materiasHasContExtra!: materia[];
  recebeu: boolean = false;
  conteudoExtraList: contExtra[] = [];
  filteredContExtra: contExtra[] = [];


  constructor(private tokenService: TokenService,
    private conteudoExtraService: ConteudoExtraService,
    private userService: UserService,
    private materiaService: MateriasService,
    private dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.buscarUser();
    this.buscaConteudoExtra();
    this.buscaMateriasComContExtra();
  }

  buscarUser() {
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
        this.userName = user ? user?.sub : null;
        this.userRole = user ? user?.role : null;
      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          title: "Error ao buscar dados do Usuario!"
        });
      }
    });
  }


  buscaConteudoExtra() {
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

    this.conteudoExtraService.listar().subscribe({
      next: (lista) => {
        if (lista.length === 0) {
          this.conteudoExtraList = [];
          this.semContExtra = true;
        } else {
          this.conteudoExtraList = lista;
          this.setfilter("");
          this.semContExtra = false;
        }
      },
      error: (err) => {

      }
    })
  }


  setfilter(materia: string): void {
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
    if (materia === "TODOS") {
      this.filteredContExtra = this.conteudoExtraList;
    } else {
      if (materia) {
        this.filteredContExtra = this.conteudoExtraList.filter(item => item.materia === materia);
      } else {
        this.filteredContExtra = this.conteudoExtraList;
      }

      if (this.recebeu && this.filteredContExtra.length === 0) {
        Toast.fire({
          icon: "error",
          title: "Sem Conteúdo dessa Materia"
        });
      }
    }
  }

  buscaMateriasComContExtra(): void {
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

    this.materiaService.listarMateriasComContExtra().subscribe({
      next: (materias) => {
        console.log(materias);
        if (materias.length === 0) {
          this.recebeu = true;
          this.materiasHasContExtra = [];
        }
        this.recebeu = true;
        this.materiasHasContExtra = materias;
        this.materiasHasContExtra.push(this.todas);
      },
      error: (err) => {
        this.materiasHasContExtra = [];
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    });
  }

  openDialog(conteudoExtra: contExtra, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UpdateContExtraDialogComponent, {
      data: { conteudoExtra },
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.buscaConteudoExtra();
      }
    });
  }
  async removeConteudoExtra(contExtraId: string) {
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

    const { value: accept } = await Swal.fire({
      title: "Exluir Conteúdo extra",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
   Tem Certeza que deseja excluir permanentemente este Conteúdo Extra?
  `,
      confirmButtonText: `
    Excluir&nbsp;<i class="fa fa-arrow-right"></i>
  `,
      inputValidator: (result) => {
        return !result && "Você aceita excluir permanentemente este Conteudo Extra!";
      }
    });
    if (accept) {
      this.conteudoExtraService.remover(contExtraId, this.token).subscribe({
        next: (success) => {
          Toast.fire({
            icon: "success",
            title: "Conteudo Extra excluido com sucesso!"
          });
          this.buscaConteudoExtra();
        },
        error: (err) => {
          Toast.fire({
            icon: "error",
            title: err.error.error
          });
        }
      });
    }
  }


}
