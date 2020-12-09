import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment-timezone';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';
import { Units } from './../../../../shared/models/units.enum';
import { DailyWeather, Weather } from './../../../../shared/models/weather.model';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyWeatherComponent {

  @Input() dailyWeather: DailyWeather = { date: undefined, weather: undefined };
  @Input() timeZone: string | undefined = '';
  @Input() unit: Units | undefined | null;

  get weather(): Weather | undefined {
    return this.dailyWeather?.weather;
  }

  get date(): string {
    if (this.dailyWeather && this.dailyWeather.date) {
      return moment.unix(this.dailyWeather.date).format('DD MMM - dddd');
    }

    return '';
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather?.icon}@2x.png`;
  }

  unixToHourMinute(value: number | undefined): string {
    if (this.timeZone && value) {
      return moment.unix(value).tz(this.timeZone).format('HH:mm');
    }

    return '';
  }
}
