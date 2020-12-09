import { CityTypeaheadItem } from './../../../shared/models/city-typeahead-item';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromBookmarkSelectors from '../state/bookmark.selectors';
import * as fromBookmarkActions from '../state/bookmark.actions';
import * as fromHomeActions from '../../home/state/home.actions';
import { Bookmark } from './../../../shared/models/bookmark.model';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit, OnDestroy {

  bookmarks$: Observable<Bookmark[]> | undefined = of([]);

  searchTypeaheadControl: FormControl = new FormControl();

  private componentDestroyed$ = new Subject();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.bookmarks$ = this.store.select(fromBookmarkSelectors.selectBookmark);

    this.searchTypeaheadControl.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromBookmarkActions.toogleBookmarkByGeoId({ id: value.geonameid }));
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  removeBookmark(id: number | undefined): void {
    if (id === undefined) {
      alert('cidade não encontrada');
    } else {
      this.store.dispatch(fromBookmarkActions.removeBookmark({ id }));
    }
  }
}
