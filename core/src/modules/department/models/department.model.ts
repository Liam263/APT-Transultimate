import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GeneralStatus } from '../../../enums/enum';
import { HydratedDocument, Types } from 'mongoose';

export type DepartmentDocument = HydratedDocument<Department>;

@Schema()
export class Department {
  @Prop({ required: true })
  departmentName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  status: GeneralStatus;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
