import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory, IGetCategories, ISaveCategory } from '../models/category.model';
import { IIdResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private basePath = 'http://localhost:5000/api/categories'

  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<IGetCategories> {
    return this.http.get<IGetCategories>(this.basePath);
  }

  public deleteCategories(categoryIds: number[]): Observable<string> {
    const params = {
      categoryIds: categoryIds,
    };

    return this.http.delete<any>(this.basePath, {params: params});
  }

  public saveCategory(category: ISaveCategory): Observable<IIdResponse> {
    return this.http.post<IIdResponse>(this.basePath, category);
  }
}
