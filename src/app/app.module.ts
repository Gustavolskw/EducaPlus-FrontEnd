import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cmpt/header/header.component';
import { FooterComponent } from './cmpt/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './cmpt/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContExtraComponent } from './pages/cont-extra/cont-extra.component';
import { CardContExtraComponent } from './cmpt/card-cont-extra/card-cont-extra.component';
import { NavMateriasComponent } from './cmpt/nav-materias/nav-materias.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { CardAtividadeComponent } from './cmpt/card-atividade/card-atividade.component';
import { CadastroUserComponent } from './pages/cadastro-user/cadastro-user.component';
import { CadastroUserFormComponent } from './cmpt/cadastro-user-form/cadastro-user-form.component';
import { MatSelectModule } from '@angular/material/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdministracaoComponent } from './pages/administracao/administracao.component';
import { ContainerUserAnaliseComponent } from './cmpt/container-user-analise/container-user-analise.component';
import { AtividadesSelectComponent } from './pages/atividades-select/atividades-select.component';
import { CardFeedbackComponent } from './cmpt/card-feedback/card-feedback.component';
import { FormEnviaRespostaComponent } from './cmpt/form-envia-resposta/form-envia-resposta.component';
import { FormEnviaFeedbackComponent } from './cmpt/form-envia-feedback/form-envia-feedback.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManageAtividadesComponent } from './cmpt/manage-atividades/manage-atividades.component';
import { UpdateAtividadeDialogComponent } from './cmpt/manage-atividades/update-atividade-dialog/update-atividade-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageContExtraComponent } from './cmpt/manage-cont-extra/manage-cont-extra.component';
import { UpdateContExtraDialogComponent } from './cmpt/manage-cont-extra/update-cont-extra-dialog/update-cont-extra-dialog.component';
import { ManageNotasComponent } from './cmpt/manage-notas/manage-notas.component';
import { UpdateNotasDialogComponent } from './cmpt/manage-notas/update-notas-dialog/update-notas-dialog.component';
import { PostagensComponent } from './pages/postagens/postagens.component';
import { FormContExtraComponent } from './cmpt/form-cont-extra/form-cont-extra.component';
import { FormAtividadesComponent } from './cmpt/form-atividades/form-atividades.component';
import { FormPostaNotaAvaliacaoComponent } from './cmpt/form-posta-nota-avaliacao/form-posta-nota-avaliacao.component';
import { PostaNotaDialogComponent } from './cmpt/form-posta-nota-avaliacao/posta-nota-dialog/posta-nota-dialog.component';
import { NotasPageComponent } from './pages/notas-page/notas-page.component';
import { NotasContainerComponent } from './cmpt/notas-container/notas-container.component';
import { UsersManageComponent } from './cmpt/users-manage/users-manage.component';
import { RelatoriosComponent } from './cmpt/relatorios/relatorios.component';
import { NotasComponent } from './cmpt/relatorios/notas/notas.component';
import { PostProfessorComponent } from './cmpt/relatorios/post-professor/post-professor.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoginFormComponent,
    ContExtraComponent,
    CardContExtraComponent,
    NavMateriasComponent,
    AtividadesComponent,
    CardAtividadeComponent,
    CadastroUserComponent,
    CadastroUserFormComponent,
    AdministracaoComponent,
    ContainerUserAnaliseComponent,
    AtividadesSelectComponent,
    CardFeedbackComponent,
    FormEnviaRespostaComponent,
    FormEnviaFeedbackComponent,
    ManageAtividadesComponent,
    UpdateAtividadeDialogComponent,
    ManageContExtraComponent,
    UpdateContExtraDialogComponent,
    ManageNotasComponent,
    UpdateNotasDialogComponent,
    PostagensComponent,
    FormContExtraComponent,
    FormAtividadesComponent,
    FormPostaNotaAvaliacaoComponent,
    PostaNotaDialogComponent,
    NotasPageComponent,
    NotasContainerComponent,
    UsersManageComponent,
    RelatoriosComponent,
    NotasComponent,
    PostProfessorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    SweetAlert2Module,
    MatExpansionModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
