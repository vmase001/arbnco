import { Component } from '@angular/core';
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
  title = 'weather-app';
  data: any;
  loggedData: any;
  city = null;
  key = 'b68581d5f05bba4d0037174e9e2efb31';
  submitted = false;
  tempArray = [];
  humiArray = [];
  showChart = false;
  date = new Date().toJSON();

  constructor(private http: HttpClient, public db: AngularFirestore) {}

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

  saveQuery() {
    return this.db.collection('items').add({
      city: this.city.toLowerCase(),
      date: this.date,
      humidity: this.humiArray,
      temperature: this.tempArray
    });
  }

  save() {
    this.saveQuery();
    this.clear();
  }

  getlog() {
    return this.db
      .collection('items')
      .snapshotChanges()
      .subscribe(response => (this.loggedData = response));
  }

  showLog() {
    this.getlog();
    //console.log(this.loggedData[0].payload.doc.id);
    if (this.loggedData) {
      console.log(this.loggedData);
    }
  }
}
