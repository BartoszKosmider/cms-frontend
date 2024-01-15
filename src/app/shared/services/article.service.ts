import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment, IGetArticle, IGetArticleTitlesDto, IGetComments, IGetMicroArticlesList, IMicroArticle, ISaveArticle, ISaveArticleComment, SortingType } from '../models/article.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseArticlePath = 'api/article';
  private baseArticleLikePath = 'api/likes';
  private baseArticleCommentPath = 'api/comment';

  constructor(
    private http: HttpClient,
  ) { }

  public getArticle(articleId: number): Observable<IGetArticle> {
    return this.http.get<IGetArticle>(this.baseArticlePath + '/' + articleId);
  }

  public getMicroArticle(articleId: number): Observable<IMicroArticle> {
    return this.http.get<IMicroArticle>(this.baseArticlePath + '/' + articleId + '/short');
  }

  public getArticlesByTitle(title: string): Observable<IGetArticleTitlesDto> {
    // return this.http.get<IMicroArticle>(this.basePath + articleId);

    return of(<IGetArticleTitlesDto>{
      articlesIdToTitleMap: {
        0: 'nazwa 1',
        1: 'nazwa 2 ',
        2: 'nazwa 3 ',
        3: 'nazwa 4 ',
      }
    });
  }

  public getMicroArticles(sortingType: SortingType, numberOfElements = 20): Observable<IGetMicroArticlesList> {
    const params = {
      order: sortingType,
    }

    return this.http.get<IGetMicroArticlesList>(this.baseArticlePath + '/list/' + numberOfElements, {params: params});
  }

  public deleteArticles(articleIds: number[]): Observable<any> {
    const params = {
      articleIds: articleIds,
    }

    return this.http.delete<any>(this.baseArticlePath, {params: params});
  }

  public saveArticle(article: ISaveArticle): Observable<any> {
    return this.http.post<any>(this.baseArticlePath, article);
  }

  public updateArticle(article: ISaveArticle, articleId: number): Observable<any> {
    return this.http.put<any>(this.baseArticlePath + '/' + articleId, article);
  }

  public getArticleComments(articleId: number): Observable<IGetComments> {
    return this.http.get<IGetComments>(this.baseArticleCommentPath + '/' + articleId);
  }

  public saveArticleComment(articleId: number, dto: ISaveArticleComment): Observable<number> {
    return this.http.post<number>(this.baseArticleCommentPath + '/' + articleId, dto);
  }

  public deleteArticleComment(commentId: number): Observable<any> {
    return this.http.delete<any>(this.baseArticleCommentPath + '/' + commentId);
  }

  public likeArticle(articleId: number): Observable<any> {
    const params = {
      articleId: articleId,
    }

    return this.http.post(this.baseArticleLikePath, {}, { params: params});
  }

  public dislikeArticle(articleId: number): Observable<any> {
    const params = {
      articleId: articleId,
    }

    return this.http.delete(this.baseArticleLikePath, { params: params});
  }
}
