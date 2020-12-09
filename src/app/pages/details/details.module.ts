import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from './../../shared/components/components.module';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';
import { DetailsPage } from './containers/details/details.page';
import { DetailsGuard } from './services/details.guard';
import { DetailsEffects } from './state/details.effects';
import { detailsReducer } from './state/details.reducer';



@NgModule({
  declarations: [DetailsPage, DailyWeatherComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('details', detailsReducer),
    RouterModule.forChild([
      { path: '', component: DetailsPage, canActivate: [DetailsGuard] }]),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule,

  ],
  exports: [DailyWeatherComponent],
  providers: [DetailsGuard]
})
export class DetailsModule { }
