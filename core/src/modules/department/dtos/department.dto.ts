import { IsString } from 'class-validator';
import { GeneralStatus } from '../../../enums/enum';

export class DepartmentDTO {
  @IsString()
  departmentName: string;

  @IsString()
  status: GeneralStatus;
}
