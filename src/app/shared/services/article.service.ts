import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle, IComment, IGetArticle, IGetArticleTitlesDto, IMicroArticle, ISaveArticle, ISaveArticleComment } from '../models/article.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private basePath = 'http://localhost:5000/api/article'

  constructor(
    private http: HttpClient,
  ) { }

  public getArticle(articleId: number): Observable<IGetArticle> {
    return this.http.get<IGetArticle>(this.basePath + '/' + articleId);
  }

  public getMicroArticle(articleId: number): Observable<IMicroArticle> {
    // return this.http.get<IMicroArticle>(this.basePath + articleId);

    return of(<IMicroArticle>{
      id: 1,
      title: 'tytuł',
      description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
      category: 'kategoria',
    });
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

  public getMicroArticles(): Observable<IMicroArticle[]> {
    // return this.http.get<IMicroArticle>(this.basePath + articleId);

    return of(<IMicroArticle[]>[
      {
        id: 1,
        title: 'tytuł1',
        description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
        category: 'kategoria1',
        date: '2022-12-31 13:13'
      },
      {
        id: 2,
        title: 'tytuł2',
        description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
        category: '2022-12-31 13:13',
      },
      {
        id: 3,
        title: 'tytuł3',
        description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
        category: 'kategoria3',
      },
      {
        id: 4,
        title: 'tytuł5',
        description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
        category: 'kategoria4',
      },
    ]);
  }

  public deleteArticles(articleIds: number[]): Observable<any> {
    // return this.http.delete<any>(this.basePath + JSON.stringify(articleIds));

    return of('dupa');
  }

  public saveArticle(article: ISaveArticle): Observable<any> {
    return this.http.post<any>(this.basePath, article);
  }

  public updateArticle(article: ISaveArticle, articleId: number): Observable<any> {
    return this.http.put<any>(this.basePath + '/' + articleId, article);
  }

  public getArticleComments(articleId: number, timestamp: string, limit: number, offset: number): Observable<IComment[]> {
    return of([
      {
        id: 1,
        content: 'chujowe',
        authorId: 'guid1',
        authorName: 'jebacz',
      },
      {
        id: 1,
        content: 'zajebiste',
        authorId: 'guid2',
        authorName: 'spocony_fanatyk2011pl',
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
}
