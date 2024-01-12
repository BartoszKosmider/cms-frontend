import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { IMicroArticle } from 'src/app/shared/models/article.model';
import { IMicroArticleComponent } from 'src/app/shared/models/site.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-micro-article',
  templateUrl: './micro-article.component.html',
  styleUrl: './micro-article.component.scss',
})
export class MicroArticleComponent {
  public microArticle?: IMicroArticle;

  @Input()
  public component!: IMicroArticleComponent;


  private previousMicroArticleId?: number;

  constructor(
    private articleService: ArticleService,
  ) { }

  public refreshMicroArticle(articleId?: number): void {
    if (_.isNil(this.component.articleId) || this.previousMicroArticleId === this.component.articleId) {
      return;
    }
    this.previousMicroArticleId = this.component.articleId;
    this.getMicroArticle(<number>this.component.articleId)
  }

  private getMicroArticle(articleId: number): void {
    this.articleService.getMicroArticle(articleId).subscribe(value => {
      this.microArticle = value;
      this.component.articleTitle = value.title;
    });
  }
}
