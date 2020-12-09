import { UnitSymbolPipe } from './../pipe/unit-symbol.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CitiesTypeaheadComponent } from './cities-typeahead/cities-typeahead.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
    UnitSymbolPipe
  ],
  exports: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
    UnitSymbolPipe
  ]
})
export class ComponentsModule {
}
