export class CreateUserDto {
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
