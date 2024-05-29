import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MateriasService } from 'src/app/services/materias.service';
import { NotaService } from 'src/app/services/nota.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { materia, NotaBusca } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';
import { UpdateNotasDialogComponent } from './update-notas-dialog/update-notas-dialog.component';

@Component({
  selector: 'app-manage-notas',
  templateUrl: './manage-notas.component.html',
  styleUrls: ['./manage-notas.component.scss']
})
export class ManageNotasComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  todas: materia = { 'materiaName': 'TODOS', 'materiaId': 100 }
  userRole!: number | null;
  userName!: string | null;
  token!: string;
  semNota: boolean = true;
  materiasHasNota!: materia[];
  recebeu: boolean = false;
  notaList: NotaBusca[] = [];
  filteredNota: NotaBusca[] = [];
  selectedMateria: string = '';

  constructor(
    private tokenService: TokenService,
    private notaService: NotaService,
    private userService: UserService,
    private materiaService: MateriasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.buscarUser();
    this.buscaNotas();
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

  buscaNotas() {
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

    this.notaService.listaTodas().subscribe({
      next: (lista) => {
        if (lista.length === 0) {
          this.notaList = [];
          this.semNota = true;
        } else {
          this.notaList = lista;
          this.setfilter("");
          this.semNota = false;
        }
      },
      error: (err) => {
        // Handle error
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

    this.selectedMateria = materia;
    console.log(materia);// Set the selected materia

    if (materia === "TODOS") {
      this.filteredNota = this.notaList;
    } else {
      if (materia) {
        this.filteredNota = this.notaList.filter(item => item.materia === materia);
      } else {
        this.filteredNota = this.notaList;
      }

      if (this.recebeu && this.filteredNota.length === 0) {
        Toast.fire({
          icon: "error",
          title: "Sem Conteúdo dessa Materia"
        });
      }
    }
  }

  openDialog(nota: NotaBusca, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UpdateNotasDialogComponent, {
      data: { nota },
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.buscaNotas();
      }
    });
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

    this.materiaService.listarMateriasComNotas().subscribe({
      next: (materias) => {
        if (materias.length === 0) {
          this.recebeu = true;
          this.materiasHasNota = [];
        }
        this.recebeu = true;
        this.materiasHasNota = materias;
        this.materiasHasNota.push(this.todas);
      },
      error: (err) => {
        this.materiasHasNota = [];
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    });
  }



}
