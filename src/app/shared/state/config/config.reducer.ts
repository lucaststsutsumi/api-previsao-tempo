import { Action, createReducer, on } from '@ngrx/store';

import { Units } from '../../models/units.enum';

import * as fromConfigActions from './config.actions';
export interface ConfigState {
  unit: Units;
}

export const configInicialState: ConfigState = {
  unit: Units.Metric
}

const reduce = createReducer(
  configInicialState,
  on(fromConfigActions.updateUnit, (state, { unit }) => ({
    ...state,
    unit
  }))
)


export function configReducer(state: ConfigState | undefined, action: Action) {
  return reduce(state, action);
};
