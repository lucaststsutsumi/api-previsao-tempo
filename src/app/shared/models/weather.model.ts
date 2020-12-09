export interface CityWeather {
  city: City;
  weather: Weather;
}

export interface CityDailyWeather {
  city: City | undefined;
  current: Weather | undefined;
  daily: DailyWeather[] | undefined;
}

export interface City {
  id: number | undefined;
  name: string | undefined;
  country: string | undefined;
  coord: Coord | undefined;
  timeZone: string | undefined;
}

export interface Weather {
  id: number;
  description: string;
  icon: string;
  temp: number;
  minTemp: number | undefined;
  maxTemp: number | undefined;
  feelsLike: number;
  humidity: number;
  wind: Wind;
  sunrise: number;
  sunset: number;
}

export interface DailyWeather {
  date: number | undefined;
  weather: Weather | undefined;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Wind {
  speed: number;
  deg: number;
}
