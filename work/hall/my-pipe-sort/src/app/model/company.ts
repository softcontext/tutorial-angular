import { Country } from './country'

export class Company {
  company: string;
  domain: string;
  info: Country;

  constructor(company: string, domain: string, info: Country) {
    this.company = company;
    this.domain = domain;
    this.info = info;
  }
}
