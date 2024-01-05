import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private basePath = 'https://publish.twitter.com/oembed'

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getPost(url: string): Observable<any> {
    return of({
      "url": "https://twitter.com/JKowalski_posel/status/1742218969061175725",
      "author_name": "Janusz Kowalski 🇵🇱",
      "author_url": "https://twitter.com/JKowalski_posel",
      "html": "<blockquote class=\"twitter-tweet\"><p lang=\"pl\" dir=\"ltr\">W Sejmie nie ma już mniejszości niemieckiej. Jest większość, która myśli i działa po niemiecku. Odrzucenie przez rząd Tuska walki o przywrócenie polsko-niemieckiej symetrii to zgoda na dyskryminację Polaków w Niemczech i łamanie traktatu przez Berlin.<a href=\"https://t.co/NCNbcbToSH\">https://t.co/NCNbcbToSH</a></p>&mdash; Janusz Kowalski 🇵🇱 (@JKowalski_posel) <a href=\"https://twitter.com/JKowalski_posel/status/1742218969061175725?ref_src=twsrc%5Etfw\">January 2, 2024</a></blockquote>\n\n\n",
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
