export class CreateUserDto {
  id: number;
  username: string;
  email: string;
  age: string;
  readonly password: string;
  city: Cities;
}

export enum Cities {
  'Kiev',
  'Lviv',
  'Odessa',
}
