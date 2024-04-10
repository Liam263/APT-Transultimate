import { IsString } from 'class-validator';

export class AccreditationDTO {
  @IsString()
  accreditationName: string;
}
