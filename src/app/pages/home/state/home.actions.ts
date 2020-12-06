import { createAction, props } from '@ngrx/store';

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>()
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Wather Success',
  props<{ entity: any }>());

export const loadCurrentWeatherFailed = createAction('[Weather API] Load Current Wather Failed');
