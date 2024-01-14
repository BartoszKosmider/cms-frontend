import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment, IGetArticle, IGetArticleTitlesDto, IGetMicroArticlesList, IMicroArticle, ISaveArticle, ISaveArticleComment, SortingType } from '../models/article.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseArticlePath = 'api/article'
  private baseArticleLikePath = 'api/likes'

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

  public getArticleComments(articleId: number, timestamp: string, limit: number, offset: number): Observable<IComment[]> {
    return of([
      {
        id: 1,
        content: 'nie podoba mi sie',
        authorId: 'guid1',
        authorName: 'arturek69',
      },
      {
        id: 1,
        content: 'super!!!',
        authorId: 'guid2',
        authorName: 'ten_drugi_co_ukradł_księzyc',
      },
    ]);
  }

  public saveArticleComment(articleId: number, dto: ISaveArticleComment): Observable<IComment> {
    // return this.http.post<any>(this.basePath + '/' + articleId + '/comment', <ISaveArticleComment>{
    //   content: content,
    // });

    return of({
      id: 2137,
      content: dto.content,
      authorId: '<guid>',
      authorName: '<authorName>',
    },);
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
