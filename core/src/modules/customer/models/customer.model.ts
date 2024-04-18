import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CustomerStatus } from '../../../enums/enum';

export type CustomerModelDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: true, trim: true })
  businessName: string;

  @Prop({ required: true, trim: true })
  abn: string;

  @Prop({ required: true, trim: true })
  contactName: string;

  @Prop({ required: true, trim: true })
  phoneNumber: string;

  @Prop({ trim: true })
  companyLogo: string;

  @Prop({ enum: CustomerStatus, default: CustomerStatus.Active })
  status: CustomerStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
