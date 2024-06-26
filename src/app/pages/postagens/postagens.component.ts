import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss']
})
export class PostagensComponent implements OnInit {
  option!: string
  userRole!: number;

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.checkSession();
    this.buscaUser();
    if (this.userRole === 1) {

      this.option = 'cont-extra'
    } else if (this.userRole === 0) {
      this.option = 'notas'
    }
  }

  buscaUser() {
    this.userService.returnUser().subscribe({
      next: (user) => {
        if (user)
          this.userRole = user.role
      }
    })
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

  changeOption(selected: string) {
    this.option = selected
  }
}
