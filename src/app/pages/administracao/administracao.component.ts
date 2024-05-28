import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) {
  }


  ngOnInit(): void {
    this.userService.returnUser().subscribe(user => {
      console.log(user);
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
  }

  changeOption(selected: string) {
    this.option = selected
  }


}
