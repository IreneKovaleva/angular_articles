import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchValuesService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  setData(newData: any): void {
    this.dataSubject.next(newData);
  }

  getData(): any {
    return this.dataSubject.getValue();
  }

  getSearchResults(req: string): Observable<any> {
    return this._httpClient.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=6&ordering=title&title_contains_one=${req}`);
  }

}
