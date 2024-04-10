import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Accreditation,
  AccreditationDocument,
} from '../models/accreditations.model';
import { AccreditationDTO } from '../dtos/accreditation.dto';
import {
  GenericResponse,
  GetAllAccreditationResponse,
} from '../interfaces/accreditations.interface';

@Injectable()
export class AccreditationService {
  constructor(
    @InjectModel(Accreditation.name)
    private accreditationModel: Model<AccreditationDocument>,
  ) {}

  async createAccreditation(
    accreditation: AccreditationDTO,
    customerId: Types.ObjectId,
  ): Promise<GenericResponse> {
    const accreditationObject = new this.accreditationModel({
      ...accreditation,
      customerId: new Types.ObjectId(customerId),
    });

    await accreditationObject.save();

    return {
      status: true,
    };
  }

  async getAllAccreditation(
    customerId: Types.ObjectId,
  ): Promise<GetAllAccreditationResponse> {
    const customerObjectId = new Types.ObjectId(customerId);

    const accreditations = await this.accreditationModel.find({
      customerId: customerObjectId,
    });

    return {
      data: accreditations,
    };
  }

  async updateAccreditation(
    accreditation: AccreditationDTO,
    customerId: Types.ObjectId,
    accreditationId: Types.ObjectId,
  ): Promise<GenericResponse> {
    await this.checkPermissionOnAccreditation(customerId, accreditationId);

    await this.accreditationModel.findOneAndUpdate(
      { _id: new Types.ObjectId(accreditationId) },
      accreditation,
      { upsert: true },
    );

    return {
      status: true,
    };
  }

  async deleteAccreditation(
    customerId: Types.ObjectId,
    accreditationId: Types.ObjectId,
  ): Promise<GenericResponse> {
    await this.checkPermissionOnAccreditation(customerId, accreditationId);

    await this.accreditationModel.deleteOne({
      _id: new Types.ObjectId(accreditationId),
    });

    return {
      status: true,
    };
  }

  private async checkPermissionOnAccreditation(
    customerId: Types.ObjectId,
    accreditationId: Types.ObjectId,
  ): Promise<boolean> {
    const customerObjectId = new Types.ObjectId(customerId);
    const accreditationObjectId = new Types.ObjectId(accreditationId);

    const accreditation = await this.accreditationModel.findOne({
      _id: accreditationObjectId,
    });

    if (!accreditation) {
      throw new NotFoundException('Can not find this accreditation');
    }

    if (!customerObjectId.equals(accreditation.customerId)) {
      throw new ForbiddenException(
        'You do not have permission for this operation',
      );
    }

    return true;
  }
}
