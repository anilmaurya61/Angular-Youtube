import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { DetailsPageComponent } from "./details-page/details-page.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'details/:id/:videoId', component: DetailsPageComponent },
];
