import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsEmail({}, { message: 'Некоректний формат email' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Пароль має бути мінімум 6 символів' })
  password!: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}