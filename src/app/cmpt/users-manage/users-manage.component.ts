import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from 'src/app/services/auth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { NotaService } from 'src/app/services/nota.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { materia, NotaBusca, Usuario } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.scss']
})
export class UsersManageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  userRole!: number | null;
  userName!: string | null;
  token!: string;
  semUsers: boolean = true;
  materiasHasUser!: materia[];
  recebeu: boolean = false;
  userList: Usuario[] = [];
  filteredUsers: Usuario[] = [];
  selectedFilter: string = "";
  disponibilidades: string[] = ["Ativos", "Inativos", "Todos"]

  constructor(
    private tokenService: TokenService,
    private notaService: NotaService,
    private userService: UserService,
    private authService: AuthService,
    private materiaService: MateriasService,
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.buscarUser();
    this.buscaUsers();
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

  buscaUsers() {
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

    this.userService.listaTodosUsers().subscribe({
      next: (lista) => {
        if (lista.length === 0) {
          this.userList = [];
          this.semUsers = true;
        } else {
          this.userList = lista;
          this.setfilter("");
          this.semUsers = false;
        }
      },
      error: (err) => {
        // Handle error
      }
    });
  }

  setfilter(disponibilidade: string): void {
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
    this.selectedFilter = disponibilidade
    if (disponibilidade === "Todos") {
      this.filteredUsers = this.userList;
    } else {
      let disponi: boolean;
      if (disponibilidade === "Ativos") {
        disponi = true
      } else if (disponibilidade === "Inativos") {
        disponi = false
      }

      if (disponibilidade) {

        this.filteredUsers = this.userList.filter(item => item.disponibilidade === disponi);
      } else {
        this.filteredUsers = this.userList
      }
      if (this.recebeu && this.filteredUsers.length === 0) {
        Toast.fire({
          icon: "error",
          title: "Sem Usuarios Nessa Pesquisa"
        });
      }
    }

  }



  inativaUser() {

  }

  ativaUser() {

  }

}


