import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { AtividadeService } from 'src/app/services/atividade.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Atividade, materia } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { UpdateAtividadeDialogComponent } from './update-atividade-dialog/update-atividade-dialog.component';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-manage-atividades',
  templateUrl: './manage-atividades.component.html',
  styleUrls: ['./manage-atividades.component.scss']
})
export class ManageAtividadesComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  semAtividades: boolean = true;
  token!: string;
  userRole!: number | null;
  userName!: string | null;
  materiasHasAtividade!: materia[];
  filteredAtividades: Atividade[] = [];
  recebeu: boolean = false;
  atividadesList: Atividade[] = [];
  todas: materia = { 'materiaName': 'TODAS', 'materiaId': 100 }

  constructor(
    private atividadeService: AtividadeService,
    private tokenService: TokenService,
    private userService: UserService,
    private materiaService: MateriasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.buscarUser();
    this.buscarAtividades();
    this.buscaMateriasComAtividade();
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

  buscaMateriasComAtividade(): void {
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

    this.materiaService.listarMateriasComAtividade().subscribe({
      next: (materias) => {
        console.log(materias);
        if (materias.length === 0) {
          this.recebeu = true;
          this.materiasHasAtividade = [];
        }

        this.recebeu = true;
        this.materiasHasAtividade = materias;
        this.materiasHasAtividade.push(this.todas);
      },
      error: (err) => {
        this.materiasHasAtividade = [];
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    });
  }

  buscarAtividades(): void {
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

    this.atividadeService.listar().subscribe({
      next: (lista) => {
        if (lista.length === 0) {
          this.atividadesList = [];
          this.semAtividades = true;
        } else {
          this.atividadesList = lista;
          this.setfilter("");
          this.semAtividades = false;
        }
      },
      error: (err) => {
        this.atividadesList = [];
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    });
  }

  openDialog(atividade: Atividade, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UpdateAtividadeDialogComponent, {
      data: { atividade },
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.buscarAtividades();
      }
    });
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
    console.log(materia);
    if (materia === "TODAS") {
      this.filteredAtividades = this.atividadesList;
    } else {
      if (materia) {
        this.filteredAtividades = this.atividadesList.filter(item => item.materia === materia);
      } else {
        this.filteredAtividades = this.atividadesList;
      }

      if (this.recebeu && this.filteredAtividades.length === 0) {
        Toast.fire({
          icon: "error",
          title: "Sem Conteúdo dessa Materia"
        });
      }
    }
  }

  async removeAtividade(atividadeId: string) {

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
      title: "Exluir Atividade",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
   Tem Certeza que deseja excluir permanentemente esta atividade?
  `,
      confirmButtonText: `
    Excluir&nbsp;<i class="fa fa-arrow-right"></i>
  `,
      inputValidator: (result) => {
        return !result && "Você aceita excluir permanentemente esta atividade";
      }
    });
    if (accept) {
      this.atividadeService.remover(atividadeId, this.token).subscribe({
        next: (success) => {
          Toast.fire({
            icon: "success",
            title: "Atividade excluida com sucesso!"
          });
          this.buscarAtividades();
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
