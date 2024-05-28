import { UserAnaliseService } from 'src/app/services/user-analise.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { CadastroUserAnalise } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss']
})
export class CadastroUserComponent {
  constructor(private formularioService: FormularioService,
    private router: Router,
    private userAnaliseService: UserAnaliseService
  ) {

  }



  cadastrar() {
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

    const formCadastro = this.formularioService.getCadastro()


    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as CadastroUserAnalise;
      console.log(novoCadastro);
      this.userAnaliseService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log("cadastro realizado", value);
          Toast.fire({
            icon: "success",
            title: "Cadastro Realizado com sucesso"
          });

          this.router.navigate(['/login']);

        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao fazer Cadastro',
            text: error.error.error,
          });
        }
      });
    }
  }
}
