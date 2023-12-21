import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

import { ComponentType, IBlockComponent, IMicroArticleComponent, ISite } from '../models/site.model';
import { getNewGuid, BLACK_COLOR } from '../models/app.model';
import { getBaseComponent, getImageComponent } from '../models/default-components.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  // todo dodanie jakiegos pliku yaml albo konfiguracje proxy dodać
  private basePath = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getSite(): Observable<ISite> {
    // return this.http.get<ISite>(this.basePath + 'todo');

    return of(this.SITE_MOCK);
  }


  private SITE_MOCK: ISite = {
    header: {
      ...getBaseComponent(ComponentType.Header),
      text: 'cms projekt header',
      backgroundColor: '#123123',
    },
    footer: {
      ...getBaseComponent(ComponentType.Footer),
      text: 'cms projekt footer',
      backgroundColor: '#101010',
    },
    menuItems: [
      {
        id: getNewGuid(),
        title: 'test title',
        rowItems: [
          {
            ...getBaseComponent(ComponentType.Row),
            horizontalAlignment: 'justify-content-center',
            verticalAlignment: 'align-self-center',
            gridItems: [
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 6,
                components: [
                  getImageComponent(),
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#FF0000',
                    text: 'test text 1',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 6,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#0000FF',
                    text: 'test text 2',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                  <IMicroArticleComponent>{
                    ...getBaseComponent(ComponentType.MicroArticle),
                    articleId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: getNewGuid(),
        title: 'About us 1',
        rowItems: [],
      },
      {
        id: getNewGuid(),
        title: 'About us 2',
        rowItems: [],
      },
      {
        id: getNewGuid(),
        title: 'About us 3',
        rowItems: [
          {
            ...getBaseComponent(ComponentType.Row),
            horizontalAlignment: 'justify-content-center',
            verticalAlignment: 'align-self-center',
            gridItems: [
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#aaaaaa',
                    text: 'test text 1',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#321321',
                    text: 'test text 2',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#123123',
                    text: 'test text 2',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
            ],
          },
          {
            ...getBaseComponent(ComponentType.Row),
            horizontalAlignment: 'justify-content-center',
            verticalAlignment: 'align-self-center',
            gridItems: [
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#aaaaaa',
                    text: 'test text 1',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#321321',
                    text: 'test text 2',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
              {
                ...getBaseComponent(ComponentType.Grid),
                width: 4,
                components: [
                  <IBlockComponent>{
                    ...getBaseComponent(ComponentType.Block),
                    backgroundColor: '#123123',
                    text: 'test text 2',
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: BLACK_COLOR,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  }
}
