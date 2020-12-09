import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import * as fromBookmarkSelectors from '../../../bookmarks/state/bookmark.selectors';
import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import { Bookmark } from './../../../../shared/models/bookmark.model';
import { CityTypeaheadItem } from './../../../../shared/models/city-typeahead-item';
import { Units } from './../../../../shared/models/units.enum';
import { CityWeather } from './../../../../shared/models/weather.model';
import { UnitSelectorComponent } from './../unit-selector/unit-selector.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  cityWeather$: Observable<CityWeather> | undefined;
  cityWeather: CityWeather | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<boolean> | undefined;

  bookmarkList$: Observable<Bookmark[]> | undefined;
  isBookmarkFavorited$: Observable<boolean> | undefined;

  unit$!: Observable<Units>;

  formGroup: FormGroup = new FormGroup({});
  searchControlWithAutocomplete: FormControl = new FormControl();

  portalHost!: DomPortalOutlet;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.buildForm();
    this.setupPortal();
    this.setupStates();
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromHomeActions.cleanHomeState());
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.portalHost.detach();
  }

  get f(): { [key: string]: AbstractControl } | undefined {
    return this.formGroup?.controls;
  }

  ngOnInit(): void {


    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherByGeoId({ id: value.geonameid.toString() }))
        }
      });

  }

  buildForm(): void {
    this.searchControlWithAutocomplete = new FormControl(undefined);

    this.formGroup = this.fb.group(
      {
        searchControl: ['', Validators.required]
      }
    );
  }

  setupStates(): void {
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectConfigUnit));

    this.cityWeather$ = this.store.select(fromHomeSelectors.selectCurrentWeater);
    this.cityWeather$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(response => this.cityWeather = response);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeaterLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeaterError));


    this.bookmarkList$ = this.store.select(fromBookmarkSelectors.selectBookmark);
    const a$ = combineLatest([this.cityWeather$, this.bookmarkList$]);
    this.isBookmarkFavorited$ = a$.pipe(map(([current, bookmarkList]) => {
      if (!!current) {
        return bookmarkList.some(bookmark => bookmark.id === current.city.id);
      }
      return false;
    }));
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
    this.store.dispatch(fromHomeActions.toogleBookmark({ entity: bookmark }));
  }

  setupPortal(): void {
    // 1. Reference to the portal
    // This is the portal to witch the UnitSelectorComponent will be attached
    // Create a portal
    const portalContainer = new ComponentPortal(UnitSelectorComponent);
    // 2. Get the DOM element that the portal will be placed
    const el = document.querySelector('#navbar-portal-host');
    if (el === null) {
      console.error('portal não encontrado')
      return;
    }
    //3. Reference to the portalHost
    //The DomPortalOutlet is a PortalHost for attaching portals to a arbitrary DOM
    // element outside of the Angular application context.
    // the portal will be attached to the portalHost
    // create a portalHost with the DOM element as it anchor element
    this.portalHost = new DomPortalOutlet(el, this.componentFactoryResolver, this.appRef, this.injector);
    this.portalHost.attach(portalContainer);
  }
}
