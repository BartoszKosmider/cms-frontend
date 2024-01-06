import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article/article.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './site-template/footer/footer.component';
import { HeaderComponent } from './site-template/header/header.component';
import { MenuComponent } from './site-template/menu/menu.component';
import { SiteTemplateComponent } from './site-template/site-template.component';
import { SiteState } from './site-template/store/site.state';
import { AdministratorPanelComponent } from './site/administrator-panel/administrator-panel.component';
import { MainComponent } from './site/main/main.component';
import { BlockComponent } from './site/main/row/grid/block/block.component';
import { GridComponent } from './site/main/row/grid/grid.component';
import { ImageComponent } from './site/main/row/grid/image/image.component';
import { RowComponent } from './site/main/row/row.component';
import { SiteComponent } from './site/site.component';
import { NgxEditorModule } from 'ngx-editor';
import { SanitizeHtmlPipe } from './shared/pipes/sanitize-html.pipe';
import { HeaderEditorComponent } from './site/administrator-panel/editors/header-editor/header-editor.component';
import { BlockEditorComponent } from './site/administrator-panel/editors/block-editor/block-editor.component';
import { FooterEditorComponent } from './site/administrator-panel/editors/footer-editor/footer-editor.component';
import { RowEditorComponent } from './site/administrator-panel/editors/row-editor/row-editor.component';
import { GridEditorComponent } from './site/administrator-panel/editors/grid-editor/grid-editor.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { SharedDirectivesModule } from './shared/directives/shared-directives.module';
import { MaterialModule } from './shared/modules/material.module';
import { BaseEditorComponent } from './site/administrator-panel/editors/base-editor/base-editor.component';
import { ImageEditorComponent } from './site/administrator-panel/editors/image-editor/image-editor.component';
import { MicroArticleComponent } from './site/main/row/grid/micro-article/micro-article.component';
import { MicroArticleEditorComponent } from './site/administrator-panel/editors/micro-article-editor/micro-article-editor.component';
import { ArticleState } from './article/store/article.state';
import { UserComponent } from './user/user.component';
import { UserState } from './user/store/user.state';
import { SettingsComponent } from './user/settings/settings.component';
import { ArticleListComponent } from './user/article-list/article-list.component';
import { CategoryListComponent } from './user/category-list/category-list.component';
import { NewCategoryDialogComponent } from './user/category-list/new-category-dialog/new-category-dialog.component';
import { PageEditorComponent } from './site/administrator-panel/editors/page-editor/page-editor.component';
import { CoreModule } from './shared/modules/core.module';
import { RegisterComponent } from './register/register.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorDialogComponent } from './shared/error/error-dialog/error-dialog.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { FormControlValidationComponent } from './shared/validation/form-control-validation/form-control-validation.component';
import { AdminListComponent } from './user/admin-list/admin-list.component';
import { ArticlePreviewComponent } from './article/article-preview/article-preview.component';
import { ArticleCommentsComponent } from './article/article-preview/article-comments/article-comments.component';
import { CategoryState } from './user/category-list/store/category.state';
import { TwitterComponent } from './site/main/row/grid/twitter/twitter.component';
import { TwitterEditorComponent } from './site/administrator-panel/editors/twitter-editor/twitter-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AdministratorPanelComponent,
    RowComponent,
    GridComponent,
    BlockComponent,
    ImageComponent,
    ArticleComponent,
    ArticleCommentsComponent,
    ArticlePreviewComponent,
    SiteTemplateComponent,
    SiteComponent,
    SanitizeHtmlPipe,
    HeaderEditorComponent,
    BlockEditorComponent,
    FooterEditorComponent,
    RowEditorComponent,
    GridEditorComponent,
    BaseEditorComponent,
    ImageEditorComponent,
    MicroArticleComponent,
    MicroArticleEditorComponent,
    UserComponent,
    ArticleListComponent,
    CategoryListComponent,
    SettingsComponent,
    NewCategoryDialogComponent,
    PageEditorComponent,
    ErrorDialogComponent,
    LoadingBarComponent,
    FormControlValidationComponent,
    AdminListComponent,
    TwitterComponent,
    TwitterEditorComponent,
  ],
  imports: [
    AppRoutingModule,
    NgxsModule.forRoot([
      SiteState,
      ArticleState,
      UserState,
      CategoryState,
    ]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'UserState.token'
    }),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxEditorModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    MaterialModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          let token = localStorage.getItem('UserState.token');
          if (token) {
            token = token.slice(1, -1);
          }

          return token;
        },
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
