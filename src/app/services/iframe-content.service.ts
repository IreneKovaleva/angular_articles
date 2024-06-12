import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IframeContentService {
  private baseUrl = 'https://spacenews.com';
  constructor(
    private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  loadIframeContent(url: string): Observable<SafeHtml> {

    const proxiedUrl = `${this.baseUrl}/api${new URL(url).pathname}`;
    console.log('proxiedUrl', proxiedUrl)
    console.log('url', url)
    return this.httpClient.get(proxiedUrl, { responseType: 'text' }).pipe(
      map((response: string) => {
        if (typeof DOMParser !== 'undefined') {
          const domParser = new DOMParser();
          const dom = domParser.parseFromString(response, 'text/html');
          const rootNode = dom.querySelector('article');
          if (rootNode) {
            const paragraphs = Array.from(rootNode.getElementsByTagName('p'));
            let paragraphsHtml = paragraphs.map((el) => el.innerHTML).join('<br><br>');
            return this.sanitizer.bypassSecurityTrustHtml(paragraphsHtml);
          }
        }
        return '';
      })
    );
  }
}
