import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as _ from "lodash";
import { GetArticle, SaveArticle } from "./article.action";
import { IArticle } from "src/app/shared/models/article.model";
import { ArticleService } from '../../shared/services/article.service';

export interface IArticleState {
  article?: IArticle,
}

@State<IArticleState>({
  name: 'ArticleState',
  defaults: {
    article: undefined,
  },
})
@Injectable()
export class ArticleState {
  public constructor(
    private articleService: ArticleService,
  ) { }

  @Selector()
  public static article(state: IArticleState): IArticle | undefined {
    return state.article;
  }

  @Action(GetArticle)
  public getArticle(ctx: StateContext<IArticleState>, action: GetArticle): void {
    this.articleService.getArticle(action.articleId).subscribe(article => {
      ctx.patchState({
        article: article,
      });
    });
  }

  @Action(SaveArticle)
  public saveArticle(ctx: StateContext<IArticleState>, action: SaveArticle): void {
    this.articleService.saveArticle(action.article).subscribe(() => {
      console.log('todo moze cos przy zapisie potrzebne, id?', action.article);
    })
  }
}
