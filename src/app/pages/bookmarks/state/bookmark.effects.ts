import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { Bookmark } from './../../../shared/models/bookmark.model';
import { CityWeather } from './../../../shared/models/weather.model';
import * as fromBookmarksActions from './bookmark.actions';
import * as fromBookmarksSelectors from './bookmark.selectors';

@Injectable()
export class BookmarkEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private weatherService: WeatherService) {

  }

  toggleBookmarksById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookmarksActions.toogleBookmarkByGeoId),
      withLatestFrom(this.store.pipe(select(fromBookmarksSelectors.selectBookmark))),
      mergeMap(([{ id }, bookmarks]: [{ id: number }, Bookmark[]]) => {
        if (bookmarks.some(bookmark => bookmark.id === id)) {
          return of(bookmarks.filter(bookmark => bookmark.id !== id));
        }
        return this.weatherService.getCityWeatherbyGeoId(id.toString())
          .pipe(
            map((cityWeather: CityWeather) => {
              const bookmark = new Bookmark();
              bookmark.id = cityWeather.city.id;
              bookmark.coord = cityWeather.city.coord;
              bookmark.name = cityWeather.city.name;
              bookmark.country = cityWeather.city.country;
              return [...bookmarks, bookmark];
            }),
          );
      }),
      map((list: Bookmark[]) => fromBookmarksActions.updateBookmarksList({ list })),
    )
  );
}
