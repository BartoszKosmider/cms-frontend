import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { UserState } from '../store/user.state';
import { Observable } from 'rxjs';
import { ArticleFilterOption, IMicroArticle, SortingType } from 'src/app/shared/models/article.model';
import { DeleteArticles, GetArticles } from '../store/user.action';
import { SelectionModel } from '@angular/cdk/collections';
import { GetCategories } from '../category-list/store/category.action';
import { CategoryState } from '../category-list/store/category.state';
import { ICategory } from 'src/app/shared/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { OrderBy } from 'src/app/shared/models/app.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  public displayedColumns = ['id', 'title', 'category', 'createdAt', 'edit', 'select'];
  public selection = new SelectionModel<IMicroArticle>(true, []);
  public filterOptions = [
    ArticleFilterOption.Like,
    ArticleFilterOption.Name,
    ArticleFilterOption.Time,
  ];
  public orderByOptions = [
    OrderBy.ASC,
    OrderBy.DESC,
  ];

  public filterForm = new FormGroup({
    option: new FormControl(ArticleFilterOption.Name),
    orderBy: new FormControl(OrderBy.ASC),
  });

  @Select(UserState.articles)
  public articles$?: Observable<IMicroArticle[]>;

  @Select(CategoryState.categories)
  public categories$?: Observable<ICategory[]>;

  constructor(
    private userInteractionsService: UserInteractionsService,
    private store: Store,
  ) {
    this.store.dispatch(new GetArticles(SortingType.NameAscending));
  }

  public deleteSelected(): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'Are you sure?',
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

  public pageChanged($event: PageEvent) {
    console.log('changed', $event)
  }

  public refreshArticles(): void {
    const formValues = this.filterForm.getRawValue();
    let sortingType;

    if (formValues.option === ArticleFilterOption.Name && formValues.orderBy === OrderBy.ASC) {
      sortingType = SortingType.NameAscending;
    } else if (formValues.option === ArticleFilterOption.Name && formValues.orderBy === OrderBy.DESC) {
      sortingType = SortingType.NameDescending;
    } else if (formValues.option === ArticleFilterOption.Time && formValues.orderBy === OrderBy.ASC) {
      sortingType = SortingType.TimeAscending;
    } else if (formValues.option === ArticleFilterOption.Time && formValues.orderBy === OrderBy.DESC) {
      sortingType = SortingType.TimeDescending;
    } else if (formValues.option === ArticleFilterOption.Like && formValues.orderBy === OrderBy.ASC) {
      sortingType = SortingType.LikeAscending;
    } else {
      sortingType = SortingType.LikeDescending;
    }

    this.store.dispatch(new GetArticles(sortingType));
  }
}
