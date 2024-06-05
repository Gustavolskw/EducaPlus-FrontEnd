import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() loginPage = true;
  userName: string | null = null;
  role: number | null = null;
  status!: "Admin" | "Professor" | "Aluno";
  userId!: number | null;
  materiaDoProfessor!: string | null;


  constructor(private router: Router,
    private userService: UserService,
    private materiaService: MateriasService
  ) {

  }

  user$ = this.userService.returnUser();

  ngOnInit(): void {
    this.userService.returnUser().subscribe(user => {
      this.userName = user ? user.sub : null;
      this.userId = user ? user.id : null;
      this.role = user ? user.role : null;
      if (this.role != null) {
        if (this.role === 1) {
          this.status = "Professor"
        } else if (this.role === 0) {
          this.status = "Admin"
        } else {
          this.status = "Aluno"
        }
      }
    });
    if (this.role == 1) {
      this.buscaMateriaDoProfessor();
    }
  }
  buscaMateriaDoProfessor() {
    if (this.userId)
      this.materiaService.listaMateriaPorUserid(this.userId).subscribe({
        next: (materia) => {
          this.materiaDoProfessor = materia.materiaName
        },
        error: (err) => {
          this.materiaDoProfessor = null
        }
      })
  }



  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login")
  }
}
