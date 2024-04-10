import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Department, DepartmentDocument } from '../models/department.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DepartmentDTO } from '../dtos/department.dto';
import {
  GenericResponse,
  GetAllDepartmentResponse,
} from '../interfaces/department.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async createDepartment(
    department: DepartmentDTO,
    customerId: Types.ObjectId,
  ): Promise<GenericResponse> {
    console.log(department);

    const departmentObject = new this.departmentModel({
      ...department,
      customerId: new Types.ObjectId(customerId),
    });

    await departmentObject.save();

    return {
      status: true,
    };
  }

  async getAllDepartment(
    customerId: Types.ObjectId,
  ): Promise<GetAllDepartmentResponse> {
    const customerObjectId = new Types.ObjectId(customerId);

    const departments = await this.departmentModel.find({
      customerId: customerObjectId,
    });

    return {
      data: departments,
    };
  }

  async updateDepartment(
    department: DepartmentDTO,
    customerId: Types.ObjectId,
    departmentId: Types.ObjectId,
  ): Promise<GenericResponse> {
    await this.checkPermissionOnDepartment(customerId, departmentId);

    await this.departmentModel.findOneAndUpdate(
      { _id: new Types.ObjectId(departmentId) },
      department,
      { upsert: true },
    );

    return {
      status: true,
    };
  }

  async deleteDepartment(
    customerId: Types.ObjectId,
    departmentId: Types.ObjectId,
  ): Promise<GenericResponse> {
    await this.checkPermissionOnDepartment(customerId, departmentId);

    await this.departmentModel.deleteOne({
      _id: new Types.ObjectId(departmentId),
    });

    return {
      status: true,
    };
  }

  private async checkPermissionOnDepartment(
    customerId: Types.ObjectId,
    departmentId: Types.ObjectId,
  ): Promise<boolean> {
    const customerObjectId = new Types.ObjectId(customerId);
    const departmentObjectId = new Types.ObjectId(departmentId);

    const department = await this.departmentModel.findOne({
      _id: departmentObjectId,
    });

    if (!department) {
      throw new NotFoundException('Can not find this department');
    }

    if (!customerObjectId.equals(department.customerId)) {
      throw new ForbiddenException(
        'You do not have permission for this operation',
      );
    }

    return true;
  }
}
