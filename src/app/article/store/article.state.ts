import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { GetArticle, GetArticleComments, SaveArticle, SaveArticleComment, UpdateArticle } from "./article.action";
import { IArticle, IComment } from "src/app/shared/models/article.model";
import { ArticleService } from '../../shared/services/article.service';
import { Observable, exhaustMap, of } from "rxjs";
import { ArticleMapperService } from "src/app/shared/services/article-mapper.service";
import { UserInteractionsService } from "src/app/shared/user-interactions/user-interactions.service";
import { insertItem, patch, updateItem } from "@ngxs/store/operators";

export interface IArticleState {
  article?: IArticle,
  comments: IComment[];
}

@State<IArticleState>({
  name: 'ArticleState',
  defaults: {
    article: undefined,
    comments: [],
  },
})
@Injectable()
export class ArticleState {
  public constructor(
    private articleService: ArticleService,
    private articleMapperService: ArticleMapperService,
    private userInteractionsService: UserInteractionsService,
  ) { }

  @Selector()
  public static article(state: IArticleState): IArticle | undefined {
    return state.article;
  }

  @Selector()
  public static comments(state: IArticleState): IComment[] | undefined {
    return state.comments;
  }

  @Action(GetArticle)
  public getArticle(ctx: StateContext<IArticleState>, action: GetArticle): Observable<any> {
    return this.articleService.getArticle(action.articleId).pipe(
      exhaustMap(article => {
        ctx.patchState({
          article: this.articleMapperService.mapGetArticleToArticle(article),
        });

        return of();
      })
    )
  }

  @Action(SaveArticle)
  public saveArticle(ctx: StateContext<IArticleState>, action: SaveArticle): Observable<any> {
    return this.articleService.saveArticle(action.article).pipe(
      exhaustMap(() => {
        this.userInteractionsService.openDialog({
          title: 'Successfully saved article!',
        });

        return of();
      }),
    );
  }

  @Action(UpdateArticle)
  public updateArticle(ctx: StateContext<IArticleState>, action: UpdateArticle): Observable<any> {
    return this.articleService.updateArticle(action.article, action.articleId).pipe(
      exhaustMap(() => {
        this.userInteractionsService.openDialog({
          title: 'Successfully updated article!',
        });

        return of();
      }),
    );
  }

  @Action(GetArticleComments)
  public getArticleComments(ctx: StateContext<IArticleState>, action: GetArticleComments): Observable<any> {
    return this.articleService.getArticleComments(action.articleId, action.timestamp, action.limit, action.offset).pipe(
      exhaustMap(comments => {
        ctx.patchState({
          comments: comments,
        });

        return of();
      }),
    );
  }

  @Action(SaveArticleComment)
  public saveArticleComment(ctx: StateContext<IArticleState>, action: SaveArticleComment): Observable<any> {
    return this.articleService.saveArticleComment(action.articleId, action.dto).pipe(
      exhaustMap(comment => {
        ctx.setState(patch<IArticleState>({
          comments: insertItem(comment),
        }));

        return of();
      }),
    );
  }
}
