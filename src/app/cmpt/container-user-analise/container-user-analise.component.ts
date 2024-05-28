import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserAnaliseService } from 'src/app/services/user-analise.service';
import { UserAnalise } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-container-user-analise',
  templateUrl: './container-user-analise.component.html',
  styleUrls: ['./container-user-analise.component.scss']
})
export class ContainerUserAnaliseComponent implements OnInit {

  filaAnalise: UserAnalise[] = [];
  semUserEmAnalise: boolean = false;

  constructor(private userAnaliseService: UserAnaliseService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.listaDeAnalise();
  }

  listaDeAnalise() {
    this.userAnaliseService.buscarFila().subscribe({
      next: (fila) => {
        console.log(fila);
        this.filaAnalise = fila
      },
      error: (err) => {
        console.log(err);
        if (err.status == 404) {
          this.semUserEmAnalise = true
          this.filaAnalise = []
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar a busca da fila de análise',
            text: err.error.error,
          });
        }

      }
    })
  }

  aprova(id: number) {
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
    console.log(id);
    const token = this.tokenService.getToken()
    this.userAnaliseService.aprovar(id, token).subscribe({
      next: (suc) => {
        console.log(suc);
        this.listaDeAnalise();
        Toast.fire({
          icon: "success",
          title: `Usuario ${suc.login} Aprovado!`
        });
      },
      error: (err) => {
        if (err.status) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar Aprovação',
            text: "Acesso Negado!",
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar Aprovação',
            text: err.error.error,
          });
        }
      }
    })
  }
  reprova(id: number) {
    const token = this.tokenService.getToken()
    this.userAnaliseService.reprovarUsuario(id, token).subscribe({
      next: (value) => {
        console.log(value);
        Swal.fire({
          icon: "success",
          title: 'Usuario Reporvado',
          text: 'Usuario Reporvado na Analise',
        });
        this.listaDeAnalise();
      },
      error: (err) => {
        if (err.status) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar Aprovação',
            text: "Acesso Negado!",
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar Aprovação',
            text: err.error.error,
          });
        }
      }
    })
  }


}
