import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from '../app/countries/countries.component';
import { HomeComponent } from '../app/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
