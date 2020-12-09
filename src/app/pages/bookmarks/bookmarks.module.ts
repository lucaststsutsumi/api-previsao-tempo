import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { BookmarksPage } from '../bookmarks/containers/bookmarks.page';
import { ComponentsModule } from './../../shared/components/components.module';
import { bookmarksReducer } from './state/bookmark.reducer';
import { BookmarkEffects } from './state/bookmark.effects';



@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('bookmarks', bookmarksReducer),
    EffectsModule.forFeature([BookmarkEffects])
  ]
})
export class BookmarksModule { }
