import { Units } from './../models/units.enum';
import { AppState } from './../state/app.reducer';
import { Store, select } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CityWeather } from '../models/weather.model';
import { responseToCityDailyWeather, responseToCityWeather } from '../utils/response.utils';
import { environment } from './../../../environments/environment';
import { CityDailyWeather } from './../models/weather.model';
import * as fromConfigSelectors from '../state/config/config.selectors'
@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {

  private unit!: Units;
  private serviceDestroyed$ = new Subject();

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.pipe(
      select(fromConfigSelectors.selectConfigUnit),
      takeUntil(this.serviceDestroyed$)
    ).subscribe(unit => {
      this.unit = unit;
    });
  }
  ngOnDestroy(): void {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  getCityWeatherbyQuery(query: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { q: query } });
    return this.doGet('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getCityWeatherbyGeoId(id: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { id } });
    return this.doGet('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getCityWeatherbyCood(lat: number, lon: number): Observable<CityWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString()
      }
    });
    return this.doGet('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getWeatherDetails(lat: number, lon: number): Observable<CityDailyWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
        exclude: 'minutely,hourly'
      }
    });
    return this.doGet<any>('onecall', params)
      .pipe(map(response => responseToCityDailyWeather(response)));
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKey);
    params = params.append('lang', 'pt_br');
    if (!!this.unit && this.unit !== Units.SI) {
      params = params.append('units', this.unit.toLowerCase());
    }
    return this.http.get<T>(`https://api.openweathermap.org/data/2.5/${url}`, { params });
  }
}
