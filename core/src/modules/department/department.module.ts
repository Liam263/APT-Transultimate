import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './models/department.model';
import { ConfigModule } from '@nestjs/config';
// import { PermissionCheckerMiddleware } from '../../middleware/permission-checker.middleware';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})

// export class DepartmentModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(PermissionCheckerMiddleware).forRoutes({
//       path: '/department/:id',
//       method: RequestMethod.PUT,
//     });
//   }
// }
export class DepartmentModule {}
