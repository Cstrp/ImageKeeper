import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  publicId?: string;

  @IsString()
  @IsNotEmpty()
  url?: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;
}
