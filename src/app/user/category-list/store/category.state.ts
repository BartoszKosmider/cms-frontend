import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { AddNewCategory, DeleteCategories, GetCategories } from "./category.action";
import { CategoryService } from "src/app/shared/services/category.service";
import { ICategory } from "src/app/shared/models/category.model";
import { Observable, exhaustMap, of } from "rxjs";
import { append, patch, removeItem } from "@ngxs/store/operators";

export interface ICategorytate {
  categories?: ICategory[];
}

@State<ICategorytate>({
  name: 'CategoryState',
  defaults: {
    categories: undefined,
  },
})
@Injectable()
export class CategoryState {
  public constructor(
    private categoryService: CategoryService,
  ) { }

  @Selector()
  public static categories(state: ICategorytate): ICategory[] | undefined {
    return state.categories;
  }

  @Action(GetCategories)
  public getCategories(ctx: StateContext<ICategorytate>): Observable<any> {
    return this.categoryService.getCategories().pipe(exhaustMap(({categories}) => {
      ctx.patchState({
        categories: categories,
      });

      return of();
    }));
  }

  @Action(DeleteCategories)
  public deleteCategories(ctx: StateContext<ICategorytate>, action: DeleteCategories): Observable<any> {
    return this.categoryService.deleteCategories(action.categoryIds).pipe(
      exhaustMap(() => {
        action.categoryIds.forEach(categoryId => {
          ctx.setState(patch({
            categories: removeItem(c => c.id === categoryId),
          }));
        })

        return of();
      })
    );
  }

  @Action(AddNewCategory)
  public addNewCategory(ctx: StateContext<ICategorytate>, action: AddNewCategory): Observable<any> {
    return this.categoryService.saveCategory({
      category: action.category,
    }).pipe(
      exhaustMap(res => {
        ctx.setState(patch({
          categories: append([{id: res.id, category: action.category}]),
        }));

        return of();
      })
    );
  }
}
