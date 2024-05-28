import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cont-extra',
  templateUrl: './cont-extra.component.html',
  styleUrls: ['./cont-extra.component.scss']
})
export class ContExtraComponent {

  filterMateria: string = '';
}
