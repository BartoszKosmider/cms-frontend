import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { ISite } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  // todo dodanie jakiegos pliku yaml albo konfiguracje proxy dodać
  private basePath = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getSite(): Observable<ISite> {
    return this.http.get<ISite>(this.basePath + 'todo');
  }
}
