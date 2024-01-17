import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { DeleteAdmins, DeleteArticles, DeleteCurrentUser, GetAdmins, GetArticles, LoginUser, Logout, RegisterAdmin, RegisterUser } from './user.action';
import { UserService } from "src/app/shared/services/user.service";
import { IMicroArticle } from "src/app/shared/models/article.model";
import { ArticleService } from "src/app/shared/services/article.service";
import { exhaustMap } from 'rxjs/operators';
import { Navigate } from "@ngxs/router-plugin";
import { Observable, of } from "rxjs";
import { UserInteractionsService } from "src/app/shared/user-interactions/user-interactions.service";
import { ICategory } from "src/app/shared/models/category.model";
import { patch, removeItem } from "@ngxs/store/operators";
import { AccountService } from "src/app/shared/services/account.service";
import { UserRole } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/auth/auth.service";

export interface IUserState {
  categories?: ICategory[];
  articles?: IMicroArticle[];
  totalArticleCount?: number;
  admins?: string[]
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
    private accountService: AccountService,
    private articleService: ArticleService,
    private userInteractionsService: UserInteractionsService,
    private authService: AuthService,
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
  public static admins(state: IUserState): string[] | undefined {
    return state.admins;
  }

  @Selector()
  public static totalArticleCount(state: IUserState): number | undefined {
    return state.totalArticleCount;
  }

  @Action(GetArticles)
  public getArticles(ctx: StateContext<IUserState>, action: GetArticles): Observable<any> {
    return this.articleService.getMicroArticles(
      action.sortingType,
      action.numberOfElements,
      action.pageIndex,
    ).pipe(
      exhaustMap(({articles, totalArticleCount}) => {
        ctx.patchState({
          articles: articles,
          totalArticleCount: totalArticleCount,
        });

        return of();
      }),
    );
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
  public getAdmins(ctx: StateContext<IUserState>) {
    return this.accountService.getUsers(UserRole.Admin).pipe(
      exhaustMap(admins => {
        const userName = this.authService.getUserName();
        admins = admins.filter(a => a !== userName);
        ctx.patchState({
          admins: admins,
        });

        return of();
      }),
    );
  }

  @Action(DeleteAdmins)
  public deleteAdmins(ctx: StateContext<IUserState>, action: DeleteAdmins) {
    return this.accountService.deleteUsers(action.usersToDelete).pipe(
      exhaustMap(() => {
        let admins = ctx.getState().admins;
        action.usersToDelete.forEach(username => {
          admins = admins?.filter(a => a !== username);
        });

        ctx.patchState({
          admins: admins,
        });

        return of();
      }),
    );
  }

  @Action(DeleteCurrentUser)
  public deleteCurrentUser(ctx: StateContext<IUserState>) {
    return this.accountService.deleteCurrentUser().pipe(
      exhaustMap(() => {
        return ctx.dispatch([
          new Logout(),
          new Navigate(['/login']),
        ]);
      }),
    );
  }
}
