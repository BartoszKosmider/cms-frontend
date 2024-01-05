import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { DeleteAdmins, DeleteArticles, GetAdmins, GetArticles, GetUser, LoginUser, Logout, RegisterAdmin, RegisterUser } from "./user.action";
import { UserService } from "src/app/shared/services/user.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { IMicroArticle } from "src/app/shared/models/article.model";
import { ArticleService } from "src/app/shared/services/article.service";
import { exhaustMap } from 'rxjs/operators';
import { Navigate } from "@ngxs/router-plugin";
import { Observable, of } from "rxjs";
import { UserInteractionsService } from "src/app/shared/user-interactions/user-interactions.service";
import { IAdminAccount } from "src/app/shared/models/user.model";
import { ICategory } from "src/app/shared/models/category.model";
import { patch, removeItem } from "@ngxs/store/operators";

export interface IUserState {
  categories?: ICategory[];
  articles?: IMicroArticle[];
  admins?: IAdminAccount[]
  token?: string;
}

@State<IUserState>({
  name: 'UserState',
  defaults: {
    categories: undefined,
    articles: undefined,
    admins: undefined,
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
  public static articles(state: IUserState): IMicroArticle[] | undefined {
    return state.articles;
  }

  @Selector()
  public static admins(state: IUserState): IAdminAccount[] | undefined {
    return state.admins;
  }

  @Action(GetUser)
  public getArticle(ctx: StateContext<IUserState>, action: GetUser): void {

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
  public deleteArticles(ctx: StateContext<IUserState>, action: DeleteArticles): Observable<any> {
    return this.articleService.deleteArticles(action.articleIds).pipe(
      exhaustMap(res => {
        action.articleIds.forEach(articleId => {
          ctx.setState(patch<IUserState>({
            articles: removeItem(a => a.id === articleId),
          }));
        })

        return of();
      })
    );
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
      exhaustMap(() => {
        this.userInteractionsService.openDialog({
          title: 'Admin created successfully!',
        });

        return ctx.dispatch([new Navigate(['/user'])]);
      }),
    );
  }

  @Action(GetAdmins)
  public getAdmins(ctx: StateContext<IUserState>, action: GetAdmins) {
    return this.userService.getAdmins().pipe(
      exhaustMap(admins => {
        ctx.patchState({
          admins: admins,
        });

        return of();
      }),
    );
  }

  @Action(DeleteAdmins)
  public deleteAdmins(ctx: StateContext<IUserState>, action: DeleteAdmins) {
    return this.userService.getAdmins().pipe(
      exhaustMap(() => {
        let admins = ctx.getState().admins;
        action.adminsToDelete.forEach(username => {
          admins = admins?.filter(a => a.username !== username);
        });

        ctx.patchState({
          admins: admins,
        });

        return of();
      }),
    );
  }
}
