import addSubtractDate from 'add-subtract-date';

export class CreateExpiration {
  public readonly date: string;

  makeExpiration(date: string): string {
    const numb = date.split(' ')[0];
    const time = date.split(' ')[1];

    return addSubtractDate.add(new Date(), Number(numb), time);
  }
}
