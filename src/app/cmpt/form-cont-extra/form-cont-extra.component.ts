import { contExtra, materia, userLogin } from './../../types/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConteudoExtraService } from 'src/app/services/conteudo-extra.service';
import { MateriasService } from 'src/app/services/materias.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cont-extra',
  templateUrl: './form-cont-extra.component.html',
  styleUrls: ['./form-cont-extra.component.scss']
})
export class FormContExtraComponent implements OnInit {


  contExtraForm!: FormGroup;
  userId!: number | null;
  userName!: string | null;
  userMateria!: string | null;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private contExtraService: ConteudoExtraService,
    private userService: UserService,
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    // Initialize the form with default values
    this.contExtraForm = this.fb.group({
      titulo: ["", Validators.required],
      conteudo: [null, Validators.required],
      descricao: [null,],
      videoUrl: ['https://www.youtube.com/embed/',],
      materia: [null, Validators.required],
      professor: [null, Validators.required],
    });

    this.buscaAvaliador();
    this.setupFormValidators();
    this.token = this.tokenService.getToken();
  }

  setupFormValidators() {
    this.contExtraForm.get('conteudo')?.valueChanges.subscribe((value) => {
      if (value === "VIDEO") {
        this.contExtraForm.get('descricao')?.setValidators(null);
        this.contExtraForm.get('videoUrl')?.setValidators([Validators.required, Validators.maxLength(355)]);
      } else {
        this.contExtraForm.get('descricao')?.setValidators([Validators.required, Validators.maxLength(200)]);
        this.contExtraForm.get('videoUrl')?.setValidators(null);
      }
      this.contExtraForm.get('descricao')?.updateValueAndValidity();
      this.contExtraForm.get('videoUrl')?.updateValueAndValidity();
    });
  }

  buscaAvaliador() {
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
        this.userName = user ? user.sub : null;
        this.contExtraForm.patchValue({ professor: this.userId });
        this.buscaMateriaDoAvaliador();
      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
      }
    });
  }

  buscaMateriaDoAvaliador() {
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

    if (this.userId) {
      this.materiaService.listaMateriaPorUserid(this.userId).subscribe({
        next: (materia) => {
          this.userMateria = materia.materiaName;
          this.contExtraForm.patchValue({ materia: this.userMateria });
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

  enviaForm() {
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
    if (this.contExtraForm.valid) {
      const novoConteudoExtra = this.contExtraForm.getRawValue() as contExtra

      this.contExtraService.postar(novoConteudoExtra, this.token).subscribe({
        next: (resp) => {
          Toast.fire({
            icon: "success",
            title: "Conteúdo Extra Cadastrado com sucesso!"
          });
          this.contExtraForm.patchValue({
            titulo: [null],
            conteudo: [null],
            descricao: [null,],
            videoUrl: ['https://www.youtube.com/embed/',]
          })
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
}
