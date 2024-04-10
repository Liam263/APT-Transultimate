import { Module } from '@nestjs/common';
import { AccreditationService } from './services/accreditation.service';
import { AccreditationController } from './controllers/accreditation.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Accreditation,
  AccreditationSchema,
} from './models/accreditations.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Accreditation.name, schema: AccreditationSchema },
    ]),
  ],
  providers: [AccreditationService],
  controllers: [AccreditationController],
})
export class AccreditationModule {}
