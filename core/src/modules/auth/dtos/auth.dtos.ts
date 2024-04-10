import {
  IsStrongPassword,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class AuthCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
