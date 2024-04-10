import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../enums/enum';
import { DepartmentDTO } from '../dtos/department.dto';
import { DepartmentService } from '../services/department.service';
import { Types } from 'mongoose';

@Roles(Role.Customer)
@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createDepartment(
    @Body() department: DepartmentDTO,
    @Req() req: Request,
  ) {
    const { _id: customerId } = req['user'];
    return this.departmentService.createDepartment(department, customerId);
  }

  @Get('getAllDepartment')
  @HttpCode(200)
  async getAllDepartment(@Req() req: Request) {
    const { _id: customerId } = req['user'];
    return this.departmentService.getAllDepartment(customerId);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateDepartment(
    @Req() req: Request,
    @Param() departmentId: Types.ObjectId,
    @Body() department: DepartmentDTO,
  ) {
    const { _id: customerId } = req['user'];
    return this.departmentService.updateDepartment(
      department,
      customerId,
      departmentId,
    );
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteDepartment(
    @Req() req: Request,
    @Param() departmentId: Types.ObjectId,
  ) {
    const { _id: customerId } = req['user'];
    return this.departmentService.deleteDepartment(customerId, departmentId);
  }
}
