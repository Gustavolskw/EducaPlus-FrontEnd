import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { NotaService } from 'src/app/services/nota.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { NotaBusca } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-container',
  templateUrl: './notas-container.component.html',
  styleUrls: ['./notas-container.component.scss']
})
export class NotasContainerComponent implements OnInit {
  userMateria!: string;
  userRole!: number | null;
  userId!: number | null;
  listaDeNotas!: NotaBusca[];
  mensagemErro: string | null = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private materiaService: MateriasService,
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
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
        this.userId = user ? user.id : null;
        this.userRole = user ? user.role : null;
        this.getNotas();  // Call getNotas after successfully getting the user data
      },
      error: (err) => {
        Toast.fire({
          icon: 'error',
          title: err.error.error
        });
      }
    });
  }

  getNotas() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.userRole === 0) {
      this.notaService.listaTodas().subscribe({
        next: (listaNotas) => {
          this.listaDeNotas = listaNotas;
        },
        error: (err) => {
          console.log(err);
          this.mensagemErro = err.error.error;
        }
      });
    } else if (this.userRole === 1) {
      if (this.userId) {
        this.materiaService.listaMateriaPorUserid(this.userId).subscribe({
          next: (materia) => {
            this.userMateria = materia.materiaName;
            this.loadNotasForProfessor(this.userMateria);
          },
          error: (err) => {
            Toast.fire({
              icon: 'error',
              title: err.error.error
            });
          }
        });
      }
    } else if (this.userRole === 2) {
      if (this.userId) {
        this.notaService.listarPorUser(this.userId).subscribe({
          next: (listaDeNotasDoAluno) => {
            this.listaDeNotas = listaDeNotasDoAluno;
          },
          error: (err) => {
            console.log(err);
            this.mensagemErro = err.error.error;
          }
        });
      }
    }
  }

  loadNotasForProfessor(materia: string) {
    this.notaService.listarTodasNotasPorMateria(materia).subscribe({
      next: (listaDeNotasDaMateriaDoProfessor) => {
        this.listaDeNotas = listaDeNotasDaMateriaDoProfessor;
      },
      error: (err) => {
        console.log(err);
        this.mensagemErro = err.error.error;
      }
    });
  }


}
