import { Units } from './../../models/units.enum';
import { createAction, props } from '@ngrx/store';

export const updateUnit = createAction('[Config] Update Unidade de Medida', props<{ unit: Units }>());
