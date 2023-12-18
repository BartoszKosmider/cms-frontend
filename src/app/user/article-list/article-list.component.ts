import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserInteractionsService } from 'src/app/shared/services/user-interactions.service';
import { UserState } from '../store/user.state';
import { Observable } from 'rxjs';
import { IMicroArticle } from 'src/app/shared/models/article.model';
import { DeleteArticles, GetArticles } from '../store/user.action';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  public displayedColumns = ['id', 'title', 'category', 'date', 'edit', 'select'];
  public selection = new SelectionModel<IMicroArticle>(true, []);

  @Select(UserState.articles)
  public articles$?: Observable<IMicroArticle[]>;

  constructor(
    private userInteractionsService: UserInteractionsService,
    private store: Store,
  ) {
    this.store.dispatch(new GetArticles());
  }

  public deleteSelected(): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'u sure?',
    });

    popupRef.afterClosed().subscribe(result => {
      if (result) {
        const articlesToDelete = this.selection.selected.map(c => c.id);
        this.store.dispatch(new DeleteArticles(articlesToDelete));
      }
    });
  }

  public isAllSelected(articlesLength: number): boolean {
    return this.selection.selected.length == articlesLength;
  }

  public toggleAllRows(articles: IMicroArticle[]) {
    this.isAllSelected(articles.length)
      ? this.selection.clear()
      : this.selection.setSelection(...articles);
  }
}
