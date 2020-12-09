import { Action, createReducer, on } from '@ngrx/store';
import * as fromHomeActions from './home.actions';

export interface HomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const HomeInicialState: HomeState = {
  entity: undefined,
  loading: false,
  error: false,
};

const reducer = createReducer(HomeInicialState,
  on(fromHomeActions.cleanHomeState, () => HomeInicialState),
  on(fromHomeActions.loadCurrentWeather, fromHomeActions.loadCurrentWeatherByGeoId, state => (
    {
      ...state,
      loading: true,
      error: false
    }
  )),
  on(fromHomeActions.loadCurrentWeatherSuccess, (state, { entity }) => (
    {
      ...state,
      entity,
      loading: false,
    }
  )),
  on(fromHomeActions.loadCurrentWeatherFailed, state => (
    {
      ...state,
      loading: false,
      error: true
    }
  ))
  ,
  on(fromHomeActions.loadCurrentWeatherByGeoIdSuccess, (state, { entity }) => (
    {
      ...state,
      entity,
      loading: false,
    }
  )),
  on(fromHomeActions.loadCurrentWeatherByGeoIdFailed, state => (
    {
      ...state,
      loading: false,
      error: true
    }
  ))
);

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action);
}

