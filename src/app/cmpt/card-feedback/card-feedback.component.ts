import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedBackResponse } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card-feedback',
  templateUrl: './card-feedback.component.html',
  styleUrls: ['./card-feedback.component.scss']
})
export class CardFeedbackComponent {
  @Input() FeedbacksLista!: FeedBackResponse[];


}
