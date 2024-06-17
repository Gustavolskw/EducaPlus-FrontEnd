import { userLogin } from './../../types/interfaces';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formValidators } from 'src/app/form-Validator';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EditUser, Usuario } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent {
  perfilForm!: FormGroup;
  userId!: number | null;
  usuario!: Usuario;
  userPassword!: string;
  disabled = false;
  hide = true;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
      newSenha: [null, [Validators.required, formValidators.notEqualTo('senha'), Validators.minLength(5)]],
      tipoUsuario: [''],
      materia: [''],
    });
    this.desativaSenha();
    this.buscarUserInfo();

    this.perfilForm.get('tipoUsuario')?.disable();
    this.perfilForm.get('materia')?.disable();

  }

  buscarUserInfo() {
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
        this.userId = user ? user.id : null;
        this.buscaUserPorId();
      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    })
  }

  buscaUserPorId() {
    this.userService.buscaUserPorId(this.userId).subscribe({
      next: (userData) => {
        this.usuario = userData;
        this.perfilForm.patchValue({ login: userData.login, tipoUsuario: userData.role, })

        if (userData.materia) {
          this.perfilForm.patchValue({ materia: userData.materia })
        } else {
          this.perfilForm.removeControl('materia');
        }
      }
    })
  }


  movimentaSenha() {
    if (this.perfilForm.get("newSenha")?.enabled) {
      this.desativaSenha();

    } else {
      this.ativaSenha();
    }
  }


  desativaSenha() {
    this.perfilForm.get('newSenha')?.disable();
  }

  ativaSenha() {
    this.perfilForm.get('newSenha')?.enable();
    this.perfilForm.get('newSenha')?.setValidators([Validators.required, Validators.minLength(5)]);
  }


  enviarAlteracao() {
    this.perfilForm.removeControl('materia');
    this.perfilForm.removeControl('tipoUsuario');

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
    this.authService.updateAuth(this.usuario.login, this.perfilForm.get('senha')?.value).subscribe({
      next: (value) => {

        console.log(value);
        if (this.perfilForm.get('newSenha')?.value !== null || this.perfilForm.get('newSenha')?.value !== "" && this.perfilForm.get('newSenha')?.enabled) {

          if (this.perfilForm.get('login')?.value != this.usuario.login) {
            console.log("edita login e senha");
            this.editaUser(this.perfilForm.get('login')?.value, this.perfilForm.get('newSenha')?.value);
          } else {
            console.log("senha");
            this.editaUser(null, this.perfilForm.get('newSenha')?.value);
          }
        } else {
          if (this.perfilForm.get('login')?.value != this.usuario.login) {
            console.log("edita login");
            this.editaUser(this.perfilForm.get('login')?.value, this.perfilForm.get('senha')?.value);
          } else {
            console.log("edita nada");
            this.editaUser(null, this.perfilForm.get('senha')?.value);
          }
        }
      },
      error: (err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          text: err.error.error
        })
      }
    })
  }

  editaUser(login: string | null, senha: string) {

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

    this.userService.editaUsuario(login, senha, this.userId).subscribe({
      next: (value) => {
        console.log(value);
        console.log("editou, refaz login");
        if (login == null) {
          this.authService.atenticate(this.usuario.login, senha).subscribe({
            next: (value) => {
              console.log(value);
              console.log("autenticado e relogado");
              this.router.navigateByUrl("/notas")
            }, error: (err) => {
              console.log(err);
              console.log("erro de autenticacao");
            }
          })
        } else {
          this.authService.atenticate(login, senha).subscribe({
            next: (value) => {
              console.log(value);
              console.log("autenticado e relogado");
              this.router.navigateByUrl("/notas")
            }, error: (err) => {
              console.log(err);
              console.log("erro de autenticacao");
            }
          })
        }

      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          text: err.error.error
        })
      }
    })
  }

}







