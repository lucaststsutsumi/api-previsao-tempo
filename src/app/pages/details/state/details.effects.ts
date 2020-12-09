import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as fromRouterSelectors from '../../../shared/state/router/router.selector';
import { WeatherService } from './../../../shared/services/weather.service';
import { AppState } from './../../../shared/state/app.reducer';
import * as fromDetailsActions from './details.actions';

@Injectable()
export class DetailsEffects {

  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private weatherService: WeatherService
  ) { }

  loadCurrentWeather$ = createEffect(() => this.action$
    .pipe(
      ofType(fromDetailsActions.loadWeatherDetails),
      withLatestFrom(this.store.pipe(select(fromRouterSelectors.selectRouterQueryParams))),
      mergeMap(([, queryParams]: [any, Params]) => {
        const a$ = combineLatest([
          this.weatherService.getCityWeatherbyCood(queryParams.lat, queryParams.lon),
          this.weatherService.getWeatherDetails(queryParams.lat, queryParams.lon)
        ]);

        return a$;
      }

      ),
      catchError((error, caugth$) => {
        this.store.dispatch(fromDetailsActions.loadWeatherDetailsFailed());

        return caugth$;
      }),
      map(([current, daily]) => {
        const entity = daily;
        entity.city = { ...current.city, timeZone: daily?.city?.timeZone }
        return fromDetailsActions.loadWeatherDetailsSuccess({ entity });
      })
    ));
}




