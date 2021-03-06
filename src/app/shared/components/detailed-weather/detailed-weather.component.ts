import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Units } from './../../models/units.enum';
import { Weather } from './../../models/weather.model';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedWeatherComponent {

  @Input() weather: Weather | undefined;
  @Input() unit: Units | undefined | null;

  get weatherIcon(): string {
    return `http://openweathermap.org/img/wn/${this.weather?.icon}@2x.png`;
  }
}
