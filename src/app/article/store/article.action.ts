import { ISaveArticle } from "src/app/shared/models/article.model";

export class GetArticle {
  public static readonly type = '[Article] Get article';
  constructor(public articleId: number) { }
}

export class SaveArticle {
  public static readonly type = '[Article] Save article';
  constructor(public article: ISaveArticle) { }
}

