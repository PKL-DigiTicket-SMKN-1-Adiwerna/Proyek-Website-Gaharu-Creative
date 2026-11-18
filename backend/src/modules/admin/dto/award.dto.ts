import { IsString, IsOptional, IsBoolean, IsInt, Min, Max, MaxLength, Length } from 'class-validator';

/** Penghargaan yang ditampilkan di halaman Tentang / rekam jejak. */
export class CreateAwardDto {
  @Length(1, 200, { message: 'Judul wajib diisi, maksimal 200 karakter.' }) title!: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Slug maksimal 200 karakter.' }) slug?: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Penerbit maksimal 200 karakter.' }) issuer?: string;
  @IsOptional() @IsInt({ message: 'Tahun harus angka bulat.' }) @Min(1900, { message: 'Tahun minimal 1900.' }) @Max(2100, { message: 'Tahun maksimal 2100.' }) year?: number;
  @IsOptional() @IsString() @MaxLength(2000, { message: 'Deskripsi maksimal 2000 karakter.' }) description?: string;
  @IsOptional() @IsString() image_path?: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Teks alternatif maksimal 200 karakter.' }) image_alt?: string;
  @IsOptional() @IsInt({ message: 'Urutan harus angka bulat.' }) sort_order?: number;
  @IsOptional() @IsBoolean({ message: 'Status terbit harus true/false.' }) is_published?: boolean;
  @IsOptional() @IsString() locale?: string;
}

/**
 * PATCH hanya mengirim sebagian kolom (null dipakai untuk mengosongkan).
 * ponytail: kolom didaftar ulang alih-alih PartialType, sama seperti create-service.dto.ts.
 */
export class UpdateAwardDto {
  @IsOptional() @IsString({ message: 'Judul harus teks.' }) @MaxLength(200, { message: 'Judul maksimal 200 karakter.' }) title?: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Slug maksimal 200 karakter.' }) slug?: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Penerbit maksimal 200 karakter.' }) issuer?: string;
  @IsOptional() @IsInt({ message: 'Tahun harus angka bulat.' }) @Min(1900, { message: 'Tahun minimal 1900.' }) @Max(2100, { message: 'Tahun maksimal 2100.' }) year?: number;
  @IsOptional() @IsString() @MaxLength(2000, { message: 'Deskripsi maksimal 2000 karakter.' }) description?: string;
  @IsOptional() @IsString() image_path?: string;
  @IsOptional() @IsString() @MaxLength(200, { message: 'Teks alternatif maksimal 200 karakter.' }) image_alt?: string;
  @IsOptional() @IsInt({ message: 'Urutan harus angka bulat.' }) sort_order?: number;
  @IsOptional() @IsBoolean({ message: 'Status terbit harus true/false.' }) is_published?: boolean;
  @IsOptional() @IsString() locale?: string;
}