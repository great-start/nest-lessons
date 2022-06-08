import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
