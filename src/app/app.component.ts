import { Component, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Weather App';
  data: any;
  loggedData: any;
  city = null;

  submitted = false;
  tempArray = [];
  humiArray = [];
  showChart = false;
  showlog = false;
  date = new Date().toJSON();

  constructor(public db: AngularFirestore) {}

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
    this.submitted = true;
    if (this.submitted) {
      this.data.list.forEach(element => {
        this.tempArray.push(element.main.temp);
      });
      this.data.list.forEach(element => {
        this.humiArray.push(element.main.humidity);
      });
    }
  }
}
