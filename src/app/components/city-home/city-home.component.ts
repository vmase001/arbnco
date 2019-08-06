import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.sevice';
import { relative } from 'path';

@Component({
  selector: 'app-city-home',
  templateUrl: './city-home.component.html',
  styleUrls: ['./city-home.component.css']
})
export class CityHomeComponent implements OnInit {
  city: any;
  home = true;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.weatherService.searchCity(this.route.snapshot.paramMap.get('city'));
    this.weatherService.cityDataObservable$.subscribe(res => {
      this.city = res;
    });
  }

  handleNavigation(flag: number) {
    this.home = false;
    if (flag == 1) {
      this.router.navigate(['humidity'], { relativeTo: this.route });
    }
  }
}
