import { IsString, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString() slug!: string;
  @IsString() tag!: string;
  @IsString() name!: string;
  @IsOptional() @IsString() short_desc?: string;
  @IsOptional() @IsString() problem?: string;
  @IsOptional() @IsString() solution?: string;
  @IsOptional() @IsArray() deliverables?: string[];
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsInt() sort_order?: number;
  @IsOptional() @IsBoolean() is_featured?: boolean;
  @IsOptional() @IsBoolean() is_published?: boolean;
  @IsOptional() @IsString() locale?: string;
}