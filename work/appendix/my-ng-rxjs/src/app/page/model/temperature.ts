import { Main } from './main';
import { Weather } from './weather';
export * from './main';
export * from './weather';

export class Temperature {
  zip: string;
  name: string;
  main: Main;
  weather: Weather[];
}
