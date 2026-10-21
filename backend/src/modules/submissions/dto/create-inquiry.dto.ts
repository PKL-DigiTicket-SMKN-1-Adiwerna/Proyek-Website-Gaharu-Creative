import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateInquiryDto {
  @IsString() @MinLength(2) @MaxLength(120) full_name!: string;
  @IsOptional() @IsString() company?: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() service_interest?: string;
  @IsOptional() @IsString() budget_range?: string;
  @IsString() @MinLength(10) @MaxLength(5000) message!: string;
  @IsOptional() @IsString() locale?: string;
  @IsOptional() @IsString() source_page?: string;
}