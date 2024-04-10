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
import { Role } from '../../../enums/enum';
import { Roles } from '../../../decorators/roles.decorator';
import { AccreditationDTO } from '../dtos/accreditation.dto';
import { AccreditationService } from '../services/accreditation.service';
import { Types } from 'mongoose';

@Roles(Role.Customer)
@Controller('accreditation')
export class AccreditationController {
  constructor(private accreditationService: AccreditationService) {}

  @Post()
  async createAccreditation(
    @Body() accreditation: AccreditationDTO,
    @Req() req: Request,
  ) {
    const { _id: customerId } = req['user'];
    return this.accreditationService.createAccreditation(
      accreditation,
      customerId,
    );
  }

  @Get()
  @HttpCode(200)
  async getAllAccreditation(@Req() req: Request) {
    const { _id: customerId } = req['user'];
    return this.accreditationService.getAllAccreditation(customerId);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateAccreditation(
    @Req() req: Request,
    @Param() accreditationId: Types.ObjectId,
    @Body() accreditation: AccreditationDTO,
  ) {
    const { _id: customerId } = req['user'];
    return this.accreditationService.updateAccreditation(
      accreditation,
      customerId,
      accreditationId,
    );
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteAccreditation(
    @Req() req: Request,
    @Param() accreditationId: Types.ObjectId,
  ) {
    const { _id: customerId } = req['user'];
    return this.accreditationService.deleteAccreditation(
      customerId,
      accreditationId,
    );
  }
}
