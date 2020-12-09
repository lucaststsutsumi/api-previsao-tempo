import { WeatherService } from './../../../shared/services/weather.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromHomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private weatherService: WeatherService
  ) { }


  loadCurrentWatherByGeoId$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromHomeActions.loadCurrentWeatherByGeoId),
      mergeMap(({ id }) => this.weatherService.getCityWeatherbyGeoId(id)),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherByGeoIdFailed());
        return caught$;
      }),
      map((entity: any) => fromHomeActions.loadCurrentWeatherByGeoIdSuccess({ entity }))
    ),
    { useEffectsErrorHandler: true }
  );

  loadCurrentWather$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromHomeActions.loadCurrentWeather),
      mergeMap(({ query }) => this.weatherService.getCityWeatherbyQuery(query)),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: any) => fromHomeActions.loadCurrentWeatherSuccess({ entity }))
    ),
    { useEffectsErrorHandler: true }
  );

}
