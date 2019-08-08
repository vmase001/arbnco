import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { WeatherQuery } from '../weather.model';
import { ReplaySubject } from 'rxjs';

const apiKey = 'b68581d5f05bba4d0037174e9e2efb31';

@Injectable()
export class WeatherService {
  cityDataSubject = new ReplaySubject(1);
  cityDataObservable$ = this.cityDataSubject.asObservable();

  constructor(private http: HttpClient, public db: AngularFirestore) {}

  searchCity(city: string) {
    this.http
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
          city +
          '&APPID=' +
          apiKey +
          '&units=imperial'
      )
      .subscribe(res => {
        this.cityDataSubject.next(res);
      });
  }

  saveQuery(query: WeatherQuery) {
    return this.db.collection('items').add(query);
  }

  getlog() {
    return this.db.collection('items').valueChanges();
  }
}
