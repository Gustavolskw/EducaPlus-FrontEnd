import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContExtraComponent } from './pages/cont-extra/cont-extra.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { CadastroUserComponent } from './pages/cadastro-user/cadastro-user.component';
import { AdministracaoComponent } from './pages/administracao/administracao.component';

import { AtividadesSelectComponent } from './pages/atividades-select/atividades-select.component';
import { authGuard } from './guards/authGuard';
import { PostagensComponent } from './pages/postagens/postagens.component';
import { NotasPageComponent } from './pages/notas-page/notas-page.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cadastro",
    component: CadastroUserComponent
  },
  {
    path: "cont-extra",
    component: ContExtraComponent,
    canActivate: [authGuard]
  },
  {
    path: "atividades",
    component: AtividadesComponent,
    canActivate: [authGuard]
  },
  {
    path: "notas",
    component: NotasPageComponent,
    canActivate: [authGuard]
  },
  {
    path: "atividades/:id",
    component: AtividadesSelectComponent,
    canActivate: [authGuard]
  },
  {
    path: "adminstracao",
    component: AdministracaoComponent,
    canActivate: [authGuard]
  },
  {
    path: "postar-avaliar",
    component: PostagensComponent,
    canActivate: [authGuard]
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
