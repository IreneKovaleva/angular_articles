import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ArticleDataService} from "../../services/article-data.service";
import {Subject, takeUntil} from "rxjs";
import {ArticleData} from "../../interfaces/article-data.interface";
import {NgForOf, NgIf} from "@angular/common";
import {MatGridTile} from "@angular/material/grid-list";
import {IframeContentService} from "../../services/iframe-content.service";
import {SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [
    NgIf,
    MatGridTile,
    NgForOf,
    RouterLink
  ],
  templateUrl: './app.description.page.html',
  styleUrl: './app.description.page.scss'
})
export class AppDescriptionPageComponent implements OnInit {
  id: number = 0;
  articleData: ArticleData = {
    id: 0,
    url: '',
    title: '',
    image_url: '',
    summary: '',
    published_at: ""
  }
  iframeContent: SafeHtml = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private _articleDataService: ArticleDataService,
    private _iframeContentService: IframeContentService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.loadArticleData();
      }
    });
  }

  private loadArticleData(): void {
    this._articleDataService.getArticleData(this.id).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((data: ArticleData) => {
      if (data) {
        this.articleData = data;
        this.loadIframeContent(data.url);
      }
    });
  }

  loadIframeContent(url: string): void {
    this._iframeContentService.loadIframeContent(url).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((content: SafeHtml) => {
      this.iframeContent = content;
    });
  }

}
