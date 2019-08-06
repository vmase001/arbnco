import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/services/weather.sevice';
import { ChartOptions } from 'highcharts';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent implements OnInit, OnDestroy {
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
  humicharts = Highcharts;

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
    series: [{ data: [] }]
  };

  subGetGraphData: Subscription;
  ngOnInit() {
    this.subGetGraphData = combineLatest(
      this.route.params,
      this.weatherService.cityDataObservable$
    ).subscribe((data: [any, any]) => {
      const params = data[0];
      const cityData = data[1];
      this.city = cityData;
      console.log(this.city);

      this.chartDate = [];
      this.city.list.forEach(element => {
        this.chartDate.push([element.dt_txt, element.main[params.id]]);
      });
      console.log(this.humiChartOptions);
      console.log(this.humicharts);

      console.log(this.reading_names[params.id].name);
      console.log(this.reading_names[params.id].unit);

      this.humiChartOptions.title.text = this.reading_names[params.id].name;
      this.humiChartOptions.yAxis.title.text = this.reading_names[
        params.id
      ].unit;
      setTimeout(() => {
        console.log(this.humicharts);
        const chart = this.humicharts.charts.find(x => x !== undefined);
        if (!chart) {
          return;
        }
        chart.series[0].setData(this.chartDate);
      }, 0); //ImPORTANT

      console.log(this.chartDate);
    });
  }
  ngOnDestroy() {
    if (this.subGetGraphData) {
      this.subGetGraphData.unsubscribe();
    }
  }
}
