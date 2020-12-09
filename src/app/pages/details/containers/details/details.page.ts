import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';
import * as fromDetailsSelectors from '../../state/details.selectors';
import * as fromDetailsActions from '../../state/details.actions';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import { Units } from './../../../../shared/models/units.enum';
import { CityDailyWeather } from './../../../../shared/models/weather.model';
import { AppState } from './../../../../shared/state/app.reducer';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  details$: Observable<CityDailyWeather> = of({ city: undefined, current: undefined, daily: undefined });
  loading$: Observable<boolean> | undefined;
  error$: Observable<boolean> | undefined;
  unit$: Observable<Units> | undefined | null;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    this.details$ = this.store.select(fromDetailsSelectors.selectDetailsStateEntity);
    this.loading$ = this.store.select(fromDetailsSelectors.selectDetailsStateEntityLoading);
    this.error$ = this.store.select(fromDetailsSelectors.selectDetailsStateEntityError);
    this.unit$ = this.store.select(fromConfigSelectors.selectConfigUnit);
  }

}
