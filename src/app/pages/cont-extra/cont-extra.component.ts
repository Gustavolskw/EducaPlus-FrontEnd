import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-cont-extra',
  templateUrl: './cont-extra.component.html',
  styleUrls: ['./cont-extra.component.scss']
})
export class ContExtraComponent {

  filterMateria: string = '';

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService
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
