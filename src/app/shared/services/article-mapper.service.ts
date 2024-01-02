import { Injectable } from '@angular/core';
import { IArticle, IGetArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleMapperService {
  public mapGetArticleToArticle(dto: IGetArticle): IArticle {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      definition: JSON.parse(dto.contents),
      category: 'dupa',
    };
  }
}
