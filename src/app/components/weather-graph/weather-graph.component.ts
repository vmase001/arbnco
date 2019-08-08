import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/services/weather.sevice';
import { ChartOptions, Options } from 'highcharts';
import {
  combineLatest,
  Subscription,
  Subject,
  Observable,
  ReplaySubject
} from 'rxjs';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent implements OnInit, OnDestroy {
  @Input() set readingName(name) {
    console.log(name);
    this.readingNameSubject.next(name);
  }
  readingNameSubject = new ReplaySubject<string>(1);
  readingNameObservable$ = this.readingNameSubject.asObservable();

  reading_names = {
    temp: {
      name: 'Temperature',
      unit: 'temperature C'
    },
    humidity: {
      name: 'Humidity',
      unit: 'humidity %'
    }
  };
  city: any;
  chartDate: any[] = [];
  // humicharts = Highcharts;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  humiChartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    tooltip: {
      valueSuffix: ' %'
    },
    series: [{ name: ' ', data: [] }]
  };

  subGetGraphData: Subscription;
  ngOnInit() {
    this.subGetGraphData = combineLatest(
      this.readingNameObservable$,
      this.weatherService.cityDataObservable$
    ).subscribe((data: [string, any]) => {
      const readingName = data[0];
      const cityData = data[1];
      console.log(cityData);
      this.city = cityData;

      this.chartDate = [];
      this.city.list.forEach(element => {
        this.chartDate.push([element.dt_txt, element.main[readingName]]);
      });

      this.humiChartOptions.title.text = this.reading_names[readingName].name;
      this.humiChartOptions.yAxis.title.text = this.reading_names[
        readingName
      ].unit;

      setTimeout(() => {
        const chartOptions: Options = this.humiChartOptions;
        chartOptions.series[0].data = this.chartDate;
        chartOptions.series[0].name = this.city.city.name;
        Highcharts.chart(readingName, chartOptions);
      }, 0); //ImPORTANT

      // console.log(this.chartDate);
    });
  }

  ngOnDestroy() {
    if (this.subGetGraphData) {
      this.subGetGraphData.unsubscribe();
    }
  }
}
