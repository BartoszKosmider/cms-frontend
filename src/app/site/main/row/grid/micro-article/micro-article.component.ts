import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { IMicroArticle } from 'src/app/shared/models/article.model';
import { IMicroArticleComponent } from 'src/app/shared/models/site.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-micro-article',
  templateUrl: './micro-article.component.html',
  styleUrl: './micro-article.component.scss',
})
export class MicroArticleComponent implements OnInit {
  public microArticle?: IMicroArticle;

  @Input()
  public component!: IMicroArticleComponent;


  constructor(private articleService: ArticleService) {
  }

  public ngOnInit(): void {
    this.component.articleChanged$ = new Subject<number>();
    this.component.articleChanged$.subscribe(value => {
      this.getMicroArticle(value);
    });

    if (_.isNil(this.component.articleId)) {
      return;
    }

    this.getMicroArticle(this.component.articleId);
  }

  private getMicroArticle(articleId: number): void {
    this.articleService.getMicroArticle(articleId).subscribe(value => {
      this.microArticle = value;
      this.component.articleTitle = value.title;
    });
  }
}
