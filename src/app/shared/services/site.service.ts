import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IGetSite, ISaveSite } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private basePath = 'api/site/dupa';

  public constructor(private http: HttpClient) { }

  public getSite(): Observable<IGetSite> {
    return this.http.get<IGetSite>(this.basePath);
  }

  public saveSite(dto: ISaveSite): Observable<any> {
    return this.http.post<any>(this.basePath, dto);
  }
}
