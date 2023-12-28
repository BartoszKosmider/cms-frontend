import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/shared/models/article.model';
import { ArticleState } from '../store/article.state';
import * as _ from 'lodash';
import { toHTML } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';
import { GetArticle } from '../store/article.action';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  public articleId?: number;

  @Select(ArticleState.article)
  public article$?: Observable<IArticle>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.articleId = +params['articleId'];
      this.store.dispatch(new GetArticle(this.articleId));
    });
  }

  public editorXml(definition: any): string {
    return !_.isNil(definition) ? toHTML(definition) : '';
  }
}
