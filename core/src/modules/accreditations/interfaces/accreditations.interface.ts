import { AccreditationDTO } from '../dtos/accreditation.dto';

export type GenericResponse = {
  status: boolean;
};

export type GetAllAccreditationResponse = {
  data: AccreditationDTO[];
};
