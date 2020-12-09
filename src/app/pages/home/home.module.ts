import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from './../../shared/components/components.module';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HomePage } from './containers/home/home.page';
import { HomeEffects } from './state/home.effects';
import { homeReducer } from './state/home.reducer';
import { UnitSelectorComponent } from './containers/unit-selector/unit-selector.component';




@NgModule({
  declarations: [HomePage, CurrentWeatherComponent, UnitSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
