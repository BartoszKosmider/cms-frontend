import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { AddNewCategory, DeleteArticles, DeleteCategories, GetArticles, GetCategories, GetUser, LoginUser, Logout, RegisterAdmin, RegisterUser } from "./user.action";
import { UserService } from "src/app/shared/services/user.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { IMicroArticle } from "src/app/shared/models/article.model";
import { ArticleService } from "src/app/shared/services/article.service";
import { exhaustMap } from 'rxjs/operators';
import { Navigate } from "@ngxs/router-plugin";
import { of } from "rxjs";
import { UserInteractionsService } from "src/app/shared/user-interactions/user-interactions.service";

export interface IUserState {
  categories?: string[];
  articles?: IMicroArticle[];
  token?: string;
}

@State<IUserState>({
  name: 'UserState',
  defaults: {
    categories: undefined,
    articles: undefined,
    token: undefined,
  },
})
@Injectable()
export class UserState {
  public constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private userInteractionsService: UserInteractionsService,
  ) { }

  @Selector()
  public static token(state: IUserState): string | undefined {
    return state.token;
  }

  @Selector()
  public static categories(state: IUserState): string[] | undefined {
    return state.categories;
  }

  @Selector()
  public static articles(state: IUserState): IMicroArticle[] | undefined {
    return state.articles;
  }

  @Action(GetUser)
  public getArticle(ctx: StateContext<IUserState>, action: GetUser): void {

  }

  @Action(GetCategories)
  public getCategories(ctx: StateContext<IUserState>): void {
    this.categoryService.getCategories().subscribe(categories => {
      ctx.patchState({
        categories: categories,
      });
    });
  }

  @Action(DeleteCategories)
  public deleteCategories(ctx: StateContext<IUserState>, action: DeleteCategories): void {
    this.categoryService.deleteCategories(action.categoriesToDelete).subscribe(() => {
      const categories = ctx.getState().categories;
      if (_.isNil(categories)) {
        return;
      }

      ctx.patchState({
        categories: _.pull(categories, ...action.categoriesToDelete),
      })
    });
  }

  @Action(AddNewCategory)
  public addNewCategory(ctx: StateContext<IUserState>, action: AddNewCategory): void {
    this.categoryService.saveCategory(action.category).subscribe(() => {
      const categories = ctx.getState().categories;
      categories?.push(action.category);

      ctx.patchState({
        categories: categories,
      });
    });
  }

  @Action(GetArticles)
  public getArticles(ctx: StateContext<IUserState>, action: GetArticles): void {
    this.articleService.getMicroArticles().subscribe(articles => {
      ctx.patchState({
        articles: articles,
      });
    });
  }

  @Action(DeleteArticles)
  public deleteArticles(ctx: StateContext<IUserState>, action: DeleteArticles): void {
    this.articleService.deleteArticles(action.articleIds).subscribe(() => {
      let articles = ctx.getState().articles;
      action.articleIds.forEach(articleId => {
        articles = articles?.filter(a => a.id !== articleId);
      });

      ctx.patchState({
        articles: articles,
      });
    });
  }

  @Action(LoginUser)
  public loginUser(ctx: StateContext<IUserState>, action: LoginUser) {
    return this.userService.login(action.dto).pipe(
      exhaustMap(token => {
        ctx.patchState({
          token: token,
        });

        return ctx.dispatch(new Navigate(['/']));
      }),
    )
  }

  @Action(Logout)
  public logout(ctx: StateContext<IUserState>) {
    ctx.patchState({
      token: undefined,
    });
    ctx.dispatch([new Navigate(['/'])]);
  }

  @Action(RegisterUser)
  public registerUser(ctx: StateContext<IUserState>, action: RegisterUser) {
    return this.userService.registerUser(action.dto).pipe(
      exhaustMap(() => {
        this.userInteractionsService.openDialog({
          title: 'Account created successfully!',
        });

        return ctx.dispatch([new Navigate(['/login'])]);
      }),
    );
  }

  @Action(RegisterAdmin)
  public registerAdmin(ctx: StateContext<IUserState>, action: RegisterAdmin) {
    return this.userService.registerAdmin(action.dto).pipe(
      exhaustMap(() => of()),
    );
  }
}
