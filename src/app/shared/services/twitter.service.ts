import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private basePath = 'api/twitter'

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getPost(url: string): Observable<any> {
    return of({
      "url": "https://twitter.com/Magda_Gessler/status/361397351388172288",
      "author_name": "Magda Gessler",
      "author_url": "https://twitter.com/Magda_Gessler",
      "html": "<blockquote class=\"twitter-tweet\"><p lang=\"pl\" dir=\"ltr\">z mojego telefonu:):):) <a href=\"http://t.co/uPcspH4hle\">pic.twitter.com/uPcspH4hle</a></p>&mdash; Magda Gessler (@Magda_Gessler) <a href=\"https://twitter.com/Magda_Gessler/status/361397351388172288?ref_src=twsrc%5Etfw\">July 28, 2013</a></blockquote>\n\n\n",
      "width": 550,
      "height": null,
      "type": "rich",
      "cache_age": "3153600000",
      "provider_name": "Twitter",
      "provider_url": "https://twitter.com",
      "version": "1.0"
    });
  }
}
