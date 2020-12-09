import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityTypeaheadItem } from './../../models/city-typeahead-item';
import { CitiesService } from './../../services/cities.service';

@Component({
  selector: 'app-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {

  search: string | undefined;
  loading: boolean | undefined;
  dataSource$: Observable<CityTypeaheadItem[]> = of([]);

  // ControlValueAccessor variables
  private onChange: (value: CityTypeaheadItem) => void = function (): void { };
  private onTouched: () => void = function (): void { return };
  disabled: boolean = false;

  constructor(
    private citiesService: CitiesService,
    @Optional() @Self() public control: NgControl
  ) {
    control.valueAccessor = this;
  }

  // ControlValueAccessor START

  writeValue(obj: any): void {
  }

  registerOnChange(fn: (value: CityTypeaheadItem) => void): void {
    this.onChange = fn;

  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // ControlValueAccessor END
  ngOnInit(): void {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search)
    ).pipe(switchMap(query => this.citiesService.getCities(query)))
  }

  onSelect(macth: TypeaheadMatch): void {
    this.onTouched();
    this.onChange(macth.item);
  }
}
