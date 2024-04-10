import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class DriverScheduler {
  @Prop({ trim: true })
  licenceNumber: string;

  @Prop()
  licenceExpiryDate: Date;

  @Prop()
  medicalDueDate: Date;

  @Prop()
  lastMedicalDate: Date;

  @Prop()
  accreditations: string; // should be reference from further data

  @Prop()
  accreditedTraining: Date;

  @Prop()
  nhvasFatigueAccredited: Date;

  @Prop()
  nhvasEntryDate: Date;

  @Prop()
  nhvasExitDate: Date;
}

export const DriverSchedulerSchema =
  SchemaFactory.createForClass(DriverScheduler);
