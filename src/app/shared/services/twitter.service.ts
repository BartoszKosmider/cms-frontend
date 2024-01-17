import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGetTweetPost } from '../models/twitter.model';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private basePath = 'api/tweet'

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getPost(postUrl: string): Observable<IGetTweetPost> {
    const params = {
      tweet: postUrl,
    };

    return this.httpClient.get<IGetTweetPost>(this.basePath, {params: params});
  }
}
