import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CustomerStatus, Role } from '../../../enums/enum';
import {
  DriverScheduler,
  DriverSchedulerSchema,
} from './driverScheduler.model';

export type UserModelDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  fullName: string;

  // @Prop()
  // position: string;

  // @Prop()
  // mobile: string;

  // @Prop()
  // branch: string;

  @Prop({ required: true, enum: Role, default: Role.User })
  role: Role;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ trim: true, default: '' })
  photoUrl: string;

  // @Prop()
  // location: string;

  @Prop()
  dateCommenced: string;

  @Prop()
  dateCeasedStatus: string;

  // @Prop({
  //   required: true,
  //   enum: CustomerStatus,
  //   default: CustomerStatus.Active,
  // })
  // status: CustomerStatus;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ type: DriverSchedulerSchema })
  additionalData: DriverScheduler;
}

export const UserSchema = SchemaFactory.createForClass(User);
