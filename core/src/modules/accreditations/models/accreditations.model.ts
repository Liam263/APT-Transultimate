import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AccreditationDocument = HydratedDocument<Accreditation>;

@Schema()
export class Accreditation {
  @Prop({ required: true })
  accreditationName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
  customerId: Types.ObjectId;
}

export const AccreditationSchema = SchemaFactory.createForClass(Accreditation);
