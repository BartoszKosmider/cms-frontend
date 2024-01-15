import { ISaveArticle, ISaveArticleComment } from "src/app/shared/models/article.model";

export class GetArticle {
  public static readonly type = '[Article] Get article';
  constructor(public articleId: number) { }
}

export class SaveArticle {
  public static readonly type = '[Article] Save article';
  constructor(public article: ISaveArticle) { }
}

export class UpdateArticle {
  public static readonly type = '[Article] Update article';
  constructor(public article: ISaveArticle, public articleId: number) { }
}

export class GetArticleComments {
  public static readonly type = '[Article] Get article comments';
  constructor(public articleId: number) { }
}

export class SaveArticleComment {
  public static readonly type = '[Article] Save article comment';
  constructor(public articleId: number, public dto: ISaveArticleComment) { }
}

export class DeleteArticleComment {
  public static readonly type = '[Article] Delete article comment';
  constructor(public commentId: number) { }
}

export class ClearArticle {
  public static readonly type = '[Article] Clear article';
}

export class LikeArticle {
  public static readonly type = '[Article] Like article';
  constructor(public articleId: number) { }
}

export class DisLikeArticle {
  public static readonly type = '[Article] DisLike article';
  constructor(public articleId: number) { }
}
