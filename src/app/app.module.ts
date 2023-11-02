import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    AdministratorPanelComponent,
    RowComponent,
    GridComponent,
    BlockComponent,
    ImageComponent,
    ArticleComponent,
    SiteTemplateComponent,
    SiteComponent,
    SanitizeHtmlPipe,
    HeaderEditorComponent,
    BlockEditorComponent,
    FooterEditorComponent,
    RowEditorComponent,
    GridEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      SiteState,
    ]),
    NgxsRouterPluginModule.forRoot(),
    // NgxsStoragePluginModule.forRoot({
    //   key: ['LoginUserState.token', LoginState],
    // }),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxEditorModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
