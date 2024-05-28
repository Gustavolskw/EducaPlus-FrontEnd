import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TesteService } from 'src/app/services/teste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  recebeu: boolean = false;
  loginForm!: FormGroup
  hide = true;
  @Output() loginSucesso = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private testeService: TesteService
  ) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    });

    this.testarApi()
  }

  testarApi() {
    this.testeService.teste().subscribe({
      next: (cont) => {
        this.recebeu = true;
      },
      error: (err) => {
        this.recebeu = false;
        setTimeout(() => {
          this.testarApi();
        }, 3000);
      }
    }
    )
  }




  login(): void {
    if (this.loginForm.valid) {
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
      const { login, senha } = this.loginForm.value;
      this.authService.atenticate(login, senha).subscribe({
        next: (resp) => {
          this.router.navigateByUrl('/cont-extra');
          Toast.fire({
            icon: "success",
            title: "Login Realizado com sucesso!"
          });
        },
        error: (error) => {
          // Log the error and perhaps show an error message to the user
          console.error('Login failed', error)
          Swal.fire({
            icon: 'error',
            title: 'Erro ao fazer login',
            text: error.error.error,
          });
        }
      });
    }
  }


}
