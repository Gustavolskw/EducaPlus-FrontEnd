import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedBackResponse } from 'src/app/types/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-feedback',
  templateUrl: './card-feedback.component.html',
  styleUrls: ['./card-feedback.component.scss']
})
export class CardFeedbackComponent implements OnInit {

  @Input() idAtividade!: string;
  listaDeFeedbacks!: FeedBackResponse[]
  @Output() semFeedBack = new EventEmitter<boolean>()



  constructor(private feedbackService: FeedbackService) {

  }

  ngOnInit(): void {
    this.buscaFeedbacks();
  }


  buscaFeedbacks() {
    this.feedbackService.listar(this.idAtividade).subscribe({
      next: (feedbacks) => {
        if (feedbacks) {
          this.listaDeFeedbacks = feedbacks;
          this.semFeedBack.emit(feedbacks.length === 0);
        } else {
          this.listaDeFeedbacks = [];
          this.semFeedBack.emit(true);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status == 404) {
          this.listaDeFeedbacks = []
          this.semFeedBack.emit(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao fazer login',
            text: err.error.error,
          });
        }
      }
    })
  }
}
