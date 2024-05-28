import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValidators } from 'src/app/form-Validator';
import { FormularioService } from 'src/app/services/formulario.service';
import { MateriasService } from 'src/app/services/materias.service';
import { materia } from 'src/app/types/interfaces';


@Component({
  selector: 'app-cadastro-user-form',
  templateUrl: './cadastro-user-form.component.html',
  styleUrls: ['./cadastro-user-form.component.scss']
})
export class CadastroUserFormComponent implements OnInit {
  tipoUsuario: string[] = ["PROFESSOR", "ALUNO"];
  selectedTipoUsuario: string = '';
  materias!: materia[];
  cadastroForm!: FormGroup;

  @Output() enviaForm: EventEmitter<any> = new EventEmitter<any>()

  constructor(private materiaService: MateriasService, private fb: FormBuilder,
    private formularioService: FormularioService
  ) { }

  ngOnInit(): void {
    this.materiaService.listar().subscribe({
      next: (materiasList) => {
        this.materias = materiasList;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.cadastroForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirmarSenha: ['', [Validators.required, formValidators.equalTo('senha')]],
      tipoUsuario: ['', Validators.required],
      materia: [''],
      motivo: ['', Validators.required]
    });

    this.cadastroForm.get('tipoUsuario')?.valueChanges.subscribe(value => {
      this.selectedTipoUsuario = value;
      if (value === 'PROFESSOR') {
        this.cadastroForm.get('materia')?.setValidators([Validators.required]);
      } else {
        this.cadastroForm.get('materia')?.clearValidators();
      }
      this.cadastroForm.get('materia')?.updateValueAndValidity();
    });
    this.formularioService.setCadastro(this.cadastroForm);
  }

  executarEnvio() {
    this.enviaForm.emit();
    this.cadastroForm.reset();
  }


}
