import { IsString, IsOptional, IsBoolean, IsInt, MaxLength, Length } from 'class-validator';

/** Kategori portofolio dan artikel memakai kolom yang sama, jadi DTO-nya dipakai bersama. */
export class CreateCategoryDto {
  @Length(1, 120, { message: 'Nama kategori wajib diisi, maksimal 120 karakter.' }) name!: string;
  @IsOptional() @IsString() @MaxLength(120, { message: 'Slug maksimal 120 karakter.' }) slug?: string;
  @IsOptional() @IsString() @MaxLength(500, { message: 'Deskripsi maksimal 500 karakter.' }) description?: string;
  @IsOptional() @IsString() @MaxLength(120, { message: 'Ikon maksimal 120 karakter.' }) icon?: string;
  @IsOptional() @IsInt({ message: 'Urutan harus angka bulat.' }) sort_order?: number;
  @IsOptional() @IsBoolean({ message: 'Status terbit harus true/false.' }) is_published?: boolean;
  @IsOptional() @IsString() locale?: string;
}

/**
 * PATCH hanya mengirim sebagian kolom.
 * ponytail: kolom didaftar ulang alih-alih PartialType, sama seperti award.dto.ts.
 */
export class UpdateCategoryDto {
  @IsOptional() @IsString({ message: 'Nama harus teks.' }) @MaxLength(120, { message: 'Nama maksimal 120 karakter.' }) name?: string;
  @IsOptional() @IsString() @MaxLength(120, { message: 'Slug maksimal 120 karakter.' }) slug?: string;
  @IsOptional() @IsString() @MaxLength(500, { message: 'Deskripsi maksimal 500 karakter.' }) description?: string;
  @IsOptional() @IsString() @MaxLength(120, { message: 'Ikon maksimal 120 karakter.' }) icon?: string;
  @IsOptional() @IsInt({ message: 'Urutan harus angka bulat.' }) sort_order?: number;
  @IsOptional() @IsBoolean({ message: 'Status terbit harus true/false.' }) is_published?: boolean;
}
