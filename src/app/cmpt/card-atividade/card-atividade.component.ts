import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { UserService } from 'src/app/services/user.service';
import { Atividade } from 'src/app/types/interfaces';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.scss']
})
export class CardAtividadeComponent {
  @Input() filterMateria: string = '';
  atividades: Atividade[] = [];
  filteredAtividades: Atividade[] = [];
  recebeu: boolean = false;
  semNadaPostado!: string | null;
  userId!: number | null;




  constructor(
    private atividadeService: AtividadeService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchContent();
  }

  buscaUser() {
    this.userService.returnUser().subscribe({
      next: (user) => {
        this.userId = user ? user.id : null;
      }
    });
  }


  fetchContent(): void {
    this.atividadeService.listar().subscribe({
      next: (listaAtividades) => {
        this.recebeu = true;
        this.atividades = listaAtividades;

        this.applyFilter(); // Apply filter after loading content
      },
      error: (err) => {
        console.log(err);
        if (err.status !== 400) {
          if (!this.recebeu) {
            this.fetchContent(); // Retry fetching content if recebeu is false and error status is not 400
          }
        } else {
          this.recebeu = true
          this.semNadaPostado = err.error.error; // Set the received error message
        }
      }
    });
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterMateria']) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    if (this.filterMateria) {
      this.filteredAtividades = this.atividades.filter(item => item.materia === this.filterMateria);
    } else {

      this.filteredAtividades = this.atividades;
    }
    if (this.recebeu != false) {
      if (this.filteredAtividades.length == 0) {
        this.semNadaPostado = "Sem Conteúdo dessa Materia"
      } else {
        this.semNadaPostado = null;
      }
    }
  }

}
