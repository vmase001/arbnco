import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'weather-app';
  data: any;
  city = null;
  key = 'b68581d5f05bba4d0037174e9e2efb31';
  submitted = false;

  constructor(private http: HttpClient) {}

  searchCity() {
    this.submitted = true;
    return this.http
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
          this.city +
          '&APPID=' +
          this.key +
          '&units=imperial'
      )
      .subscribe(response => (this.data = response));
  }

  clear() {
    this.submitted = false;
    this.city = null;
  }
}
