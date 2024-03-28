import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class RolesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getRoles() {
    return this.prisma.role.findMany();
  }

  async createRole(role: string) {
    return this.prisma.role.create({
      data: {
        systemName: role,
        displayName: role,
      },
    });
  }

  async deleteRole(role: string) {
    const roleToDelete = await this.prisma.role.findUnique({
      where: { systemName: role },
    });

    if (!roleToDelete) {
      throw new NotFoundException(`${role} not found`);
    }

    return this.prisma.role.delete({
      where: { systemName: role },
    });
  }

  async updateRole(role: string, displayName: string) {
    const roleToUpdate = await this.prisma.role.findUnique({
      where: { systemName: role },
    });

    if (!roleToUpdate) {
      throw new NotFoundException(`${role} not found`);
    }

    return this.prisma.role.update({
      where: { systemName: role },
      data: { displayName },
    });
  }
  async resetRoles() {
    await this.prisma.role.deleteMany();
    const rolesToCreate: {
      systemName: string;
      displayName: string;
      default: boolean;
    }[] = [
      { systemName: 'Admin', displayName: 'Admin', default: true },
      {
        systemName: 'Deal Sponsor',
        displayName: 'Deal Sponsor',
        default: true,
      },
      {
        systemName: 'Integration Manager',
        displayName: 'Integration Manager',
        default: true,
      },
      {
        systemName: 'Program Manager',
        displayName: 'Program Manager',
        default: true,
      },
      {
        systemName: 'Stream Manager',
        displayName: 'Stream Manager',
        default: true,
      },
      { systemName: 'Team Member', displayName: 'Team Member', default: true },
      { systemName: 'User', displayName: 'User', default: true },
      { systemName: 'Blocked', displayName: 'Blocked', default: true },
    ];

    const createdRolesPromises = rolesToCreate.map((role) => {
      return this.prisma.role.create({
        data: {
          systemName: role.systemName,
          displayName: role.displayName,
          default: role.default,
        },
      });
    });

    const createdRoles = await Promise.all(createdRolesPromises);
    return createdRoles;
  }

  async saveRoles(
    roles: { systemName: string; displayName: string; default: boolean }[],
  ) {
    const updatedroles = [];

    for (const role of roles) {
      try {
        const updatedrole = await this.prisma.role.update({
          where: { systemName: role.systemName },
          data: { displayName: role.displayName, default: role.default },
        });
        updatedroles.push(updatedrole);
      } catch (error) {
        if (error instanceof NotFoundException) {
          console.error(`role with systemName "${role.systemName}" not found.`);
        } else {
          console.error('An error occurred while saving roles:', error);
        }
      }
    }

    return updatedroles;
  }
}
