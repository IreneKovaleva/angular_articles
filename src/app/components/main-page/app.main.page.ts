import {Component} from '@angular/core';
import { AppSearch } from "../search/app.search"
import {SearchResultsQuantity} from "../search-results-quantity/search.results.quantity";
import {SearchResults} from "../search-results/app.search.results";


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [AppSearch, SearchResultsQuantity, SearchResults],
  templateUrl: './app.main.page.html',
  styleUrl: './app.main.page.scss'
})
export class AppMainPageComponent {

}
