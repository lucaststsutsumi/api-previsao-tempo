import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoaderComponent } from './loader/loader.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoaderComponent,
    DetailedWeatherComponent,
  ],
  exports: [
    LoaderComponent,
    DetailedWeatherComponent
  ]
})
export class ComponentsModule {
}
