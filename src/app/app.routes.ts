import { Routes } from '@angular/router';
import {AppMainPageComponent} from "./components/main-page/app.main.page";
import {AppDescriptionPageComponent} from "./components/description-page/app.description.page";

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles',title:"Main Page", component: AppMainPageComponent },
  { path: 'articles/:id', title: "Article Description", component: AppDescriptionPageComponent},
];
