import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CityHomeComponent } from './components/city-home/city-home.component';
import { WeatherGraphComponent } from './components/weather-graph/weather-graph.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'city/:city',
    component: CityHomeComponent,
    children: [{ path: ':id', component: WeatherGraphComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
