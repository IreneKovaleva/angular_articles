import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSearch } from "./components/search/app.search";
import {SearchResultsQuantity} from "./components/search-results-quantity/search.results.quantity";
import {SearchResults} from "./components/search-results/app.search.results";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppSearch, SearchResultsQuantity, SearchResults],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'articles-app';
}
