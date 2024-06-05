import { TokenService } from './../../services/token.service';
import { authGuard } from './../../guards/authGuard';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RelatoriosService } from 'src/app/services/relatorios.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {
  role: number | null = null;
  status!: "ADMIN" | "STAFF" | "USER";
  option!: string



  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {
  }


  ngOnInit(): void {
    this.checkSession();
    this.userService.returnUser().subscribe(user => {
      this.role = user ? user.role : null;
      if (this.role != null) {
        if (this.role === 1) {
          this.status = "STAFF"
        } else if (this.role === 0) {
          this.status = "ADMIN"
        } else {
          this.status = "USER"
        }
      }
    });
    if (this.role === 2) {
      this.router.navigateByUrl('/atividades')
    }


    if (this.role === 0) {
      this.option = "users";
    } else if (this.role === 1) {
      this.option = "atividade"
    }
  }

  changeOption(selected: string) {
    this.option = selected
  }

  checkSession() {
    this.authService.isAuthenticated(this.tokenService.getToken()).subscribe({
      error: (erro) => {
        if (erro.status === 500) {
          this.userService.logout();
        }
      }
    })
  }
}
