import { DepartmentDTO } from '../dtos/department.dto';

export type GenericResponse = {
  status: boolean;
};

export type GetAllDepartmentResponse = {
  data: DepartmentDTO[];
};
