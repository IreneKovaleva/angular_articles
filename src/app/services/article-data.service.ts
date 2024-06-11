import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  constructor(private _httpClient: HttpClient) {}

  getArticleData(req: number): Observable<any> {
    return this._httpClient.get(`https://api.spaceflightnewsapi.net/v4/articles/${req}`);
  }
}
