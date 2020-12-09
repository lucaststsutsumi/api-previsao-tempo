import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import * as fromConfigActions from '../../../../shared/state/config/config.actions';
import { Units } from './../../../../shared/models/units.enum';
import { AppState } from './../../../../shared/state/app.reducer';
@Component({
  selector: 'app-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.scss']
})
export class UnitSelectorComponent implements OnInit, OnDestroy {

  unit$: Observable<Units> | undefined;
  unit: Units | undefined;

  unitsEnum = Units;
  private componentDestroyed$ = new Subject();

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  ngOnInit(): void {
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectConfigUnit));

    this.unit$.pipe(takeUntil(this.componentDestroyed$)).subscribe((unit: Units) => this.unit = unit);
  }

  updateUnit(unit: Units): void {
    this.store.dispatch(fromConfigActions.updateUnit({ unit }));
  }
}
