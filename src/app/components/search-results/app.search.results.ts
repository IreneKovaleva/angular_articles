import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {SearchValuesService} from "../../services/search-values.service";
import {SearchResult} from "../../interfaces/search-results.interface"
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {DateSuffix} from "../../pipes/date.suffix";
import {HighlightPipe} from "../../pipes/text.highlight";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    NgIf,
    DateSuffix,
    HighlightPipe,
    RouterLink
  ],
  templateUrl: './app.search.results.html',
  styleUrl: './app.search.results.scss'
})
export class SearchResults implements OnInit{
  searchResults: SearchResult[] = [{id: 0,
    title: '',
    url: '',
    image_url: '',
    summary: '',
    published_at: ""
  }];
  searchResultsValue: string = '';

  constructor(
    private _searchValuesService: SearchValuesService,
  ) {}

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this._searchValuesService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      if (data) {
        this.searchResults = data.data;
        this.searchResultsValue = data.keyword
      }
    })
  }
}
