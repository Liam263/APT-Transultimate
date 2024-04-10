import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CustomerStatus, Role } from '../../../enums/enum';
import { Type } from 'class-transformer';

class DriverScheduler {
  @IsString()
  @IsOptional()
  licenceNumber: string;

  @IsString()
  @IsOptional()
  licenceExpiryDate: Date;

  @IsString()
  @IsOptional()
  medicalDueDate: Date;

  @IsString()
  @IsOptional()
  lastMedicalDate: Date;

  @IsString()
  @IsOptional()
  accreditations: string; // should be reference from further data

  @IsString()
  @IsOptional()
  accreditedTraining: Date;

  @IsString()
  @IsOptional()
  nhvasFatigueAccredited: Date;

  @IsString()
  @IsOptional()
  nhvasEntryDate: Date;

  @IsString()
  @IsOptional()
  nhvasExitDate: Date;
}

export class UserDto {
  @IsString()
  fullName: string; // require for all

  // @IsString()
  // position: string; // require for Driver/Scheduler

  // @IsString()
  // @IsOptional()
  // mobile: string;

  // @IsString()
  // branch: string; // require for Driver/Scheduler

  @IsString()
  role: Role; // require for all

  @IsEmail()
  email: string; // require for all

  @IsString()
  password: string; // require for all

  @IsString()
  @IsOptional()
  photoUrl: string;

  // @IsString()
  // location: string; // require for Driver/Scheduler

  @IsString()
  @IsOptional()
  dateCommenced: string;

  @IsString()
  @IsOptional()
  dateCeasedStatus: string;

  // @IsString()
  // status: CustomerStatus; // require for Driver/Scheduler

  @Type(() => DriverScheduler)
  @ValidateNested()
  additionalInfo: DriverScheduler;
}
