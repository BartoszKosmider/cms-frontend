import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { AddNewCategory, DeleteCategories, GetCategories } from "./category.action";
import { UserService } from "src/app/shared/services/user.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { ArticleService } from "src/app/shared/services/article.service";
import { UserInteractionsService } from "src/app/shared/user-interactions/user-interactions.service";
import { ICategory } from "src/app/shared/models/category.model";

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
    private userService: UserService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private userInteractionsService: UserInteractionsService,
  ) { }

  @Selector()
  public static categories(state: ICategorytate): ICategory[] | undefined {
    return state.categories;
  }

  @Action(GetCategories)
  public getCategories(ctx: StateContext<ICategorytate>): void {
    this.categoryService.getCategories().subscribe(categories => {
      ctx.patchState({
        categories: categories,
      });
    });
  }

  @Action(DeleteCategories)
  public deleteCategories(ctx: StateContext<ICategorytate>, action: DeleteCategories): void {
    this.categoryService.deleteCategories(action.categoriesToDelete).subscribe(() => {
      const categories = ctx.getState().categories;
      if (_.isNil(categories)) {
        return;
      }

      // ctx.patchState({
      //   categories: _.pull(categories, ...action.categoriesToDelete),
      // })
    });
  }

  @Action(AddNewCategory)
  public addNewCategory(ctx: StateContext<ICategorytate>, action: AddNewCategory): void {
    this.categoryService.saveCategory(action.category).subscribe(() => {
      const categories = ctx.getState().categories;
      // categories?.push(action.category);

      // ctx.patchState({
      //   categories: categories,
      // });
    });
  }
}
