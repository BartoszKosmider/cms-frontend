import { Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { NewCategoryDialogComponent } from './new-category-dialog/new-category-dialog.component';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../store/user.state';
import { Observable } from 'rxjs';
import { AddNewCategory, DeleteCategories, GetCategories } from '../store/user.action';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {

  @Select(UserState.categories)
  public categories$?: Observable<string[]>;

  constructor(
    private userInteractionsService: UserInteractionsService,
    private store: Store,
  ) {
    this.store.dispatch(new GetCategories());
  }

  public deleteSelected(categories: MatListOption[]): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'u sure?',
    });

    popupRef.afterClosed().subscribe(result => {
      if (result) {
        const categoriesToDelete = categories.map(c => c.getLabel());
        this.store.dispatch(new DeleteCategories(categoriesToDelete));
      }
    });
  }

  public addNewCategory(categories: string[]): void {
    const popupRef = this.userInteractionsService.openCustomPopup
      <NewCategoryDialogComponent,string[],string>(NewCategoryDialogComponent, categories);

    popupRef.afterClosed().subscribe(category => {
      if (category) {
        this.store.dispatch(new AddNewCategory(category));
      }
    });
  }
}
