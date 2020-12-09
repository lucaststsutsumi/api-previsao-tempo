import { Units } from './../../../../shared/models/units.enum';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CityWeather } from './../../../../shared/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {

  @Input() cityWeather: CityWeather | undefined;
  @Input() isBookmarked: boolean | undefined;
  @Input() unit: Units | undefined | null;
  @Output() toggleBookmark = new EventEmitter();

  get cityName(): string {
    return `${this.cityWeather?.city.name}, ${this.cityWeather?.city.country}`;
  }

  onToggleBookmark(): void {
    this.toggleBookmark.emit();
  }
}
