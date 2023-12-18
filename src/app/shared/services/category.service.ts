import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private basePath = 'todo';

  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<string[]> {
    // return this.http.get<string[]>(this.basePath);

    return of([
      'kategoria 1',
      'kategoria 2',
      'kategoria 3',
      'kategoria 4',
      'kategoria 5',
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
