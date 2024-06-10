import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {SearchValuesService} from "../../services/search-values.service";

@Component({
  standalone: true,
  selector: 'app-search',
  styleUrl: 'app.search.scss',
  templateUrl: 'app.search.html',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class AppSearch {

  constructor(
    private _searchValuesService: SearchValuesService,
  ) {}

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
}
