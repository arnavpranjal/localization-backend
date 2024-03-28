import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StagesService } from './stages.service';
@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}
  @Get()
  async getRoles() {
    return this.stagesService.getRoles();
  }
  @Post()
  async createRole(@Body('role') role: string) {
    return this.stagesService.createRole(role);
  }
  @Delete(':roleId')
  async deleteRole(@Param('roleId') roleId: string) {
    return this.stagesService.deleteRole(roleId);
  }
  @Put(':roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body('displayName') displayName: string,
  ) {
    return this.stagesService.updateRole(roleId, displayName);
  }
  @Post('reset')
  async resetRoles() {
    return this.stagesService.resetRoles();
  }
  @Post('save')
  async saveStages(
    @Body()
    stages: { systemName: string; displayName: string; default: boolean }[],
  ) {
    return this.stagesService.saveStages(stages);
  }
}
