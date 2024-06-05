import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { NotaService } from 'src/app/services/nota.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { NotaBusca } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-page',
  templateUrl: './notas-page.component.html',
  styleUrls: ['./notas-page.component.scss']
})
export class NotasPageComponent implements OnInit {




  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession() {
    this.authService.isAuthenticated(this.tokenService.getToken()).subscribe({
      error: (erro) => {
        console.log(erro);
        if (erro.status === 500) {
          this.userService.logout();
        }
      }
    })
  }




}
