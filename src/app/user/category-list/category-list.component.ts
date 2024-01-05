import { Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { NewCategoryDialogComponent } from './new-category-dialog/new-category-dialog.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryState } from './store/category.state';
import { AddNewCategory, DeleteCategories, GetCategories } from './store/category.action';
import { ICategory } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {

  @Select(CategoryState.categories)
  public categories$?: Observable<ICategory[]>;

  constructor(
    private userInteractionsService: UserInteractionsService,
    private store: Store,
  ) {
    this.store.dispatch(new GetCategories());
  }

  public deleteSelected(categories: MatListOption[]): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'Are you sure?',
    });

    popupRef.afterClosed().subscribe(result => {
      if (result) {
        const categoryIds = categories.map(c => (<ICategory>c.value).id);
        this.store.dispatch(new DeleteCategories(categoryIds));
      }
    });
  }

  public addNewCategory(categories: ICategory[]): void {
    const popupRef = this.userInteractionsService.openCustomPopup
      <NewCategoryDialogComponent,ICategory[],string>(NewCategoryDialogComponent, categories);

    popupRef.afterClosed().subscribe(category => {
      if (category) {
        this.store.dispatch(new AddNewCategory(category));
      }
    });
  }
}
