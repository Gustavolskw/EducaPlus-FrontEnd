import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  status!: "ADMIN" | "STAFF" | "USER";


  constructor(private router: Router,
    private userService: UserService
  ) {

  }

  user$ = this.userService.returnUser();

  ngOnInit(): void {
    this.userService.returnUser().subscribe(user => {
      this.userName = user ? user.sub : null;
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



  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login")
  }
}
