import { Bookmark } from './../../../../shared/models/bookmark.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import { CityWeather } from './../../../../shared/models/weather.model';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<boolean> | undefined;

  formGroup: FormGroup = new FormGroup({});


  private componentDestroyed$ = new Subject();


  constructor(private fb: FormBuilder, private store: Store) { }


  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  get f(): { [key: string]: AbstractControl } | undefined {
    return this.formGroup?.controls;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        searchControl: ['', Validators.required]
      }
    );

    this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeater),
      takeUntil(this.componentDestroyed$)
    ).subscribe(response => this.cityWeather = response);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeaterLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeaterError));
  }



  doSearch(): void {
    const query = this.f?.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }

  onToggleBookmark(): void {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather?.city?.id;
    bookmark.name = this.cityWeather?.city?.name;
    bookmark.country = this.cityWeather?.city.country;
    bookmark.coord = this.cityWeather?.city.coord;
  }
}
