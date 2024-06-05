import { TokenService } from './../../services/token.service';
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
  @Output() feedbackRemovido = new EventEmitter();

  constructor(private feedbackService: FeedbackService,
    private tokenService: TokenService
  ) {

  }

  removeFeedback(feedbackId: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    this.feedbackService.removeFeedBack(feedbackId, this.tokenService.getToken()).subscribe({
      next: (value) => {
        console.log(value);

        Toast.fire({
          icon: "success",
          title: value.reposnseMessage
        });
        this.feedbackRemovido.emit();
      },
      error: (err) => {
        Toast.fire({
          icon: "error",
          title: err.error.error
        });
        this.feedbackRemovido.emit();
      }
    })
  }
}
