import { Bookmark } from './../../../shared/models/bookmark.model';
import { createAction, props } from '@ngrx/store';

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>()
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Wather Success',
  props<{ entity: any }>());

export const loadCurrentWeatherFailed = createAction('[Weather API] Load Current Wather Failed');

export const toogleBookmark = createAction('[Home] toogle bookmark', props<{ entity: Bookmark }>());


export const loadCurrentWeatherByGeoId = createAction(
  '[Home] Load Current Weather by geografyId',
  props<{ id: string }>()
);

export const loadCurrentWeatherByGeoIdSuccess = createAction(
  '[Weather API] Load Current Wather by geografyId Success',
  props<{ entity: any }>());

export const loadCurrentWeatherByGeoIdFailed = createAction('[Weather API] Load Current Wather by geografyId Failed');










export const cleanHomeState = createAction('[Home] clean home state');
