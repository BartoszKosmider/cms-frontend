import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle, IGetArticleTitlesDto, IMicroArticle, ISaveArticle } from '../models/article.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private basePath = 'todo';

  constructor(
    private http: HttpClient,
  ) { }

  public getArticle(articleId: number): Observable<IArticle> {
    // return this.http.get<IArticle>(this.basePath + articleId);

    return of(<IArticle>{
      id: 1,
      title: 'tytuł',
      category: 'todo',
      description: 'lorem dlsakfklsa lkska lkfsdk ksdak flaksdkl fsdak',
      definition: {
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "attrs": {
                    "align": null
                },
                "content": [
                    {
                        "type": "text",
                        "marks": [
                            {
                                "type": "strong"
                            }
                        ],
                        "text": "nowy artykuł"
                    }
                ]
            },
            {
                "type": "paragraph",
                "attrs": {
                    "align": "center"
                },
                "content": [
                    {
                        "type": "text",
                        "text": "xdxdxddx"
                    }
                ]
            },
            {
                "type": "paragraph",
                "attrs": {
                    "align": "right"
                },
                "content": [
                    {
                        "type": "image",
                        "attrs": {
                            "src": "https://sklepmocwslabosci.pl/userdata/public/gfx/470/Jezus-Milosierny.-Obraz-A4-z-zawieszka.jpg",
                            "alt": "",
                            "title": "",
                            "width": "460px"
                        }
                    }
                ]
            }
        ]
    },
    });
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
    // return this.http.post<any>(this.basePath, article);

    return of('dupa2');
  }

  public updateArticle(article: ISaveArticle, articleId: number): Observable<any> {
    // return this.http.put<any>(this.basePath + articleId, article);

    return of('dupa3');
  }
}
