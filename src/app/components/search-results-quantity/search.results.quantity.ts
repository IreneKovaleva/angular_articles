import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {SearchValuesService} from "../../services/search-values.service";

@Component({
  selector: 'app-search-results-quantity',
  standalone: true,
  imports: [],
  templateUrl: './search.results.quantity.html',
  styleUrl: './search.results.quantity.scss'
})
export class SearchResultsQuantity implements OnInit, OnDestroy{
  searchResultsQuantity: number = 0;

  constructor(
    private _searchValuesService: SearchValuesService,
  ) {}

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this._searchValuesService.data$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(results => {
        if (results && results.data) {
          this.searchResultsQuantity = results.data.length;
        }
      });
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
