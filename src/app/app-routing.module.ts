import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article/article.component';
import { SiteComponent } from './site/site.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { IsLoggedGuardService } from './shared/auth/is-logged-guard.service';
import { ArticlePreviewComponent } from './article/article-preview/article-preview.component';
import { IsAdminLoggedGuardService } from './shared/auth/is-admin-logged-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: '', component: SiteComponent },
  { path: 'article/:articleId', component: ArticleComponent, canActivate: [IsAdminLoggedGuardService] },
  { path: 'article-preview/:articleId', component: ArticlePreviewComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
