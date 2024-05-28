import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { materia } from 'src/app/types/interfaces';

@Component({
  selector: 'app-nav-materias',
  templateUrl: './nav-materias.component.html',
  styleUrls: ['./nav-materias.component.scss']
})
export class NavMateriasComponent implements OnInit {
  materias!: materia[];
  materia!: string
  @Output() filterMateriaChanged = new EventEmitter<string>();





  constructor(
    private materiaService: MateriasService,
    private router: Router) { }
  ngOnInit(): void {
    this.materiaService.listar().subscribe({
      next: (materiasList) => {
        this.materias = materiasList;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
  setFilter(materia: string): void {
    this.filterMateriaChanged.emit(materia);
  }

}
