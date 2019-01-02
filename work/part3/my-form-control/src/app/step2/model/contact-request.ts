import { PersonalData } from './personal-data';

export class ContactRequest {
  personalData: PersonalData;
  requestType: any = '';
  text: string = '';
}
