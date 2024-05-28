import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConteudoExtraService } from 'src/app/services/conteudo-extra.service';
import { contExtra } from 'src/app/types/interfaces';

@Component({
  selector: 'app-card-cont-extra',
  templateUrl: './card-cont-extra.component.html',
  styleUrls: ['./card-cont-extra.component.scss']
})
export class CardContExtraComponent implements OnInit, OnChanges {
  /*  @Input() titulo: string = "Video Teste"
  @Input() materia: string = "Teste de Video"
  @Input() urlVideo: string = "https://www.youtube.com/embed/rrNaJxWBpsM"
  @Input() descricao: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"
  @Input() professor: string = "Gustavo"
  */
  @Input() filterMateria: string = '';
  conteudoExtra: contExtra[] = [];
  safeUrls: SafeResourceUrl[] = [];
  filteredConteudoExtra: contExtra[] = [];
  filteredSafeUrls: SafeResourceUrl[] = [];
  recebeu: boolean = false;
  semNadaPostado!: string | null;





  constructor(
    private contExtraService: ConteudoExtraService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fetchContent();
  }


  fetchContent(): void {
    this.contExtraService.listar().subscribe({
      next: (listaConteudo) => {
        this.recebeu = true;
        this.conteudoExtra = listaConteudo;
        this.safeUrls = this.conteudoExtra.map(item =>
          this.sanitizer.bypassSecurityTrustResourceUrl(item.videoUrl)
        );
        this.applyFilter(); // Apply filter after loading content
      },
      error: (err) => {
        if (err.status !== 400) {
          if (!this.recebeu) {
            this.fetchContent(); // Retry fetching content if recebeu is false and error status is not 400
          }
        } else {
          this.recebeu = true
          this.semNadaPostado = err.error.error; // Set the received error message
        }
      }
    });
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterMateria']) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    if (this.filterMateria) {
      this.filteredConteudoExtra = this.conteudoExtra.filter(item => item.materia === this.filterMateria);
      this.filteredSafeUrls = this.filteredConteudoExtra.map(item =>
        this.sanitizer.bypassSecurityTrustResourceUrl(item.videoUrl)
      );
    } else {
      this.filteredConteudoExtra = this.conteudoExtra;
      this.filteredSafeUrls = this.safeUrls;
    }
    if (this.recebeu != false) {
      if (this.filteredConteudoExtra.length == 0) {
        this.semNadaPostado = "Sem Conteúdo dessa Materia"
      } else {
        this.semNadaPostado = null;
      }
    }
  }




}


//https://www.youtube.com/embed/rrNaJxWBpsM
/*public safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    for (let i = 0; this.conteudoExtra.length; i++) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl();
    }
  }

  updateUrl(unsafeUrl: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }*/


// "https://www.youtube.com/embed/jrL_LzX5wv4"
