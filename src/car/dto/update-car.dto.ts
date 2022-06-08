import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;
}
