import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  async getRoles() {
    return this.rolesService.getRoles();
  }
  @Get(':roleId')
  async getRoleById(@Param('roleId') roleId: string) {
    return this.rolesService.getRoleById(roleId);
  }
  @Post()
  async createRole(@Body('role') role: string) {
    return this.rolesService.createRole(role);
  }
  @Delete(':roleId')
  async deleteRole(@Param('roleId') roleId: string) {
    return this.rolesService.deleteRole(roleId);
  }
  @Put(':roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body('displayName') displayName: string,
  ) {
    return this.rolesService.updateRole(roleId, displayName);
  }
  @Post('reset')
  async resetRoles() {
    return this.rolesService.resetRoles();
  }
  @Post('save')
  async saveStages(
    @Body()
    stages: { systemName: string; displayName: string; default: boolean }[],
  ) {
    return this.rolesService.saveRoles(stages);
  }
}
