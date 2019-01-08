export class Memo {
  text: string;
  date: Date | string;

  constructor(text: string, date: Date) {
    this.text = text;
    this.date = date;
  }
}
