import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private basePath = 'todo';

  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<ICategory[]> {
    // return this.http.get<ICategory[]>(this.basePath);

    return of([
      { id: 1, name: 'kategoria 1'},
      { id: 2, name: 'kategoria 2'},
      { id: 3, name: 'kategoria 3'},
      { id: 4, name: 'kategoria 4'},
    ]);
  }

  public deleteCategories(categories: string[]): Observable<string> {
    // return this.http.post<void>(this.basePath, categories);

    return of('test');
  }

  public saveCategory(category: string): Observable<any> {
    // return this.http.post<void>(this.basePath, categories);

    return of('test');
  }
}
