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

/**
 * PATCH hanya mengirim sebagian kolom.
 * ponytail: kolom didaftar ulang dengan @IsOptional() alih-alih PartialType dari
 * @nestjs/mapped-types, karena paket itu berbentuk ESM dan bikin jest (e2e) gagal parse.
 */
export class UpdateServiceDto {
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() tag?: string;
  @IsOptional() @IsString() name?: string;
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