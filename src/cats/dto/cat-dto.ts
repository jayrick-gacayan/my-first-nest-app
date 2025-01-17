import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CatDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsNotEmpty()
  breed: string;
}
