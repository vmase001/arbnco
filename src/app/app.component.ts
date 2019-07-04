import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
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
  tempArray = [];
  humiArray = [];
  showChart = false;

  constructor(private http: HttpClient) {}

  tempcharts = Highcharts;
  chartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Temperature'
    },
    xAxis: {},
    yAxis: {
      title: {
        text: 'Temperature °F'
      }
    },
    tooltip: {
      valueSuffix: ' °F'
    },
    series: [
      {
        data: this.tempArray
      }
    ]
  };

  humicharts = Highcharts;
  humiChartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Humidity'
    },
    xAxis: {},
    yAxis: {
      title: {
        text: 'Humidity %'
      }
    },
    tooltip: {
      valueSuffix: ' %'
    },
    series: [
      {
        data: this.humiArray
      }
    ]
  };

  initTempChart() {
    this.showChart = true;
    if (this.submitted) {
      this.data.list.forEach(element => {
        this.tempArray.push(element.main.temp);
      });
      this.data.list.forEach(element => {
        this.humiArray.push(element.main.humidity);
      });
    }
  }

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
    this.showChart = false;
  }
}
