import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MateriasService } from 'src/app/services/materias.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { AtividadeCadastro } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-atividades',
  templateUrl: './form-atividades.component.html',
  styleUrls: ['./form-atividades.component.scss']
})
export class FormAtividadesComponent {
  atividadeForm!: FormGroup;
  userId!: number | null;
  userRole!: number | null;
  userName!: string | null;
  userMateria!: string | null;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private atividadeService: AtividadeService,
    private userService: UserService,
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    // Initialize the form with default values
    this.atividadeForm = this.fb.group({
      titulo: ["", Validators.required],
      tipoAtividade: [null, Validators.required],
      enunciado: [null, [Validators.required, Validators.maxLength(800)]],
      questoes: [],
      respA: [],
      respB: [],
      respC: [],
      respD: [],
      resposta: [null,],
      professor: [null, Validators.required],
      materia: [null, Validators.required]
    });

    this.buscaAvaliador();
    this.setupFormValidators();
    this.token = this.tokenService.getToken();
  }

  setupFormValidators() {
    this.atividadeForm.get('tipoAtividade')?.valueChanges.subscribe((value) => {
      if (value === "DESCRITIVA") {
        this.atividadeForm.get('questoes')?.setValidators(null);
        this.atividadeForm.get('resposta')?.setValidators(null);
      } else {

        //this.atividadeForm.get('questoes')?.setValidators([Validators.required, Validators.maxLength(200)]);
        this.atividadeForm.get('resposta')?.setValidators([Validators.required, Validators.maxLength(100)]);
        this.atividadeForm.get('respA')?.setValidators([Validators.required, Validators.maxLength(20)]);
        this.atividadeForm.get('respB')?.setValidators([Validators.required, Validators.maxLength(20)]);
        this.atividadeForm.get('respC')?.setValidators([Validators.required, Validators.maxLength(20)]);
        this.atividadeForm.get('respD')?.setValidators([Validators.required, Validators.maxLength(20)]);
      }
      this.atividadeForm.get('questoes')?.updateValueAndValidity();
      this.atividadeForm.get('resposta')?.updateValueAndValidity();
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
        this.userRole = user ? user.role : null;
        this.atividadeForm.patchValue({ professor: this.userId });
        if (this.userRole != 1) {
          this.atividadeForm.get('titulo')?.disable()
          this.atividadeForm.get('tipoAtividade')?.disable()
          this.atividadeForm.get('enunciado')?.disable()
        }
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
          this.atividadeForm.patchValue({ materia: this.userMateria });
        },
        error: (err) => {
          if (this.userRole === 1) {
            Toast.fire({
              icon: "error",
              title: err.error.error
            });
          }
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

    if (this.atividadeForm.get('tipoAtividade')?.value === 'DESCRITIVA') {
      this.atividadeForm.removeControl('respA');
      this.atividadeForm.removeControl('respB');
      this.atividadeForm.removeControl('respC');
      this.atividadeForm.removeControl('respD');
      this.atividadeForm.patchValue({ questoes: "" });
      this.atividadeForm.patchValue({ resposta: "" });
    } else if (this.atividadeForm.get('tipoAtividade')?.value === 'MULTIPLA_ESCOLHA') {
      const questoesRef = `A)${this.atividadeForm.get('respA')?.value}  B)${this.atividadeForm.get('respB')?.value}  C)${this.atividadeForm.get('respC')?.value}  D)${this.atividadeForm.get('respD')?.value}`
      this.atividadeForm.patchValue({ questoes: questoesRef });
      this.atividadeForm.removeControl('respA');
      this.atividadeForm.removeControl('respB');
      this.atividadeForm.removeControl('respC');
      this.atividadeForm.removeControl('respD');

      console.log(this.atividadeForm.get('questoes')?.value);
    }

    console.log(this.atividadeForm.value);
    if (this.atividadeForm.valid) {
      const novaAtividade = this.atividadeForm.getRawValue() as AtividadeCadastro

      this.atividadeService.adicionar(novaAtividade, this.token).subscribe({
        next: (resp) => {
          Toast.fire({
            icon: "success",
            title: "Atividade Cadastrada com sucesso!"
          });

          this.atividadeForm.addControl('respA', this.fb.control(null));
          this.atividadeForm.addControl('respB', this.fb.control(null));
          this.atividadeForm.addControl('respC', this.fb.control(null));
          this.atividadeForm.addControl('respD', this.fb.control(null));
          this.atividadeForm.patchValue({
            titulo: [null],
            tipoAtividade: [null],
            enunciado: [null],
            questoes: [null],
            resposta: [null],
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

  resetaCamposQuestResp() {
    this.atividadeForm.patchValue({
      questoes: [null],
      resposta: [null],
    })

  }
}
