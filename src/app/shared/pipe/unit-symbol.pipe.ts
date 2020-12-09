import { Pipe, PipeTransform } from '@angular/core';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';
import { Units } from './../models/units.enum';

@Pipe({
  name: 'unitSymbol'
})
export class UnitSymbolPipe implements PipeTransform {

  transform(value: Units | undefined | null): string {
    if (!value) {
      return 'métrica não identidficada';
    }
    return unitToSymbol(value);
  }

}
