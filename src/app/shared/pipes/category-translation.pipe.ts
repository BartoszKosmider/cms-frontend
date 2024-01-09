import { Pipe, type PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoryState } from 'src/app/user/category-list/store/category.state';

@Pipe({
  name: 'appCategoryTranslation',
})
export class CategoryTranslationPipe implements PipeTransform {
  constructor(
    private store: Store,
  ) { }

  public transform(categoryId: number): string {
    const categories = this.store.selectSnapshot(CategoryState.categories);
    return categories?.find(c => c.id === categoryId)?.category ?? 'Not defined';
  }

}
