import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {SearchValuesService} from "../../services/search-values.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-search',
  styleUrl: 'app.search.scss',
  templateUrl: 'app.search.html',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class AppSearch implements OnInit, OnDestroy{
  constructor(
    private _searchValuesService: SearchValuesService,
  ) {}
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  value: string = '';

  ngOnInit() {
    this._searchValuesService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.value = "rocket"

      if (data) {
        this.value = data.keyword
      }
    })
    this.onChange(this.value);
  }

  onChange(value: string) {
    setTimeout(() => {
      this._searchValuesService.getSearchResults(value).subscribe((data) => {
        if (data) {
          const results: {data: any; keyword: string} = {
            data: data.results,
            keyword: value,
          }
          this._searchValuesService.setData(results);
        }
      });
    }, 500)
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
