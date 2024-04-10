import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CustomerData {
  @IsString()
  businessName: string;

  @IsString()
  abn: string;

  @IsString()
  contactName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  companyLogo: string;

  @IsEmail()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
