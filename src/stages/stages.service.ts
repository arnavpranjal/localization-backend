import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class StagesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getRoles() {
    return this.prisma.stage.findMany();
  }

  async createRole(role: string) {
    return this.prisma.stage.create({
      data: {
        systemName: role,
        displayName: role,
      },
    });
  }

  async deleteRole(role: string) {
    const roleToDelete = await this.prisma.stage.findUnique({
      where: { systemName: role },
    });

    if (!roleToDelete) {
      throw new NotFoundException(`${role} not found`);
    }

    return this.prisma.stage.delete({
      where: { systemName: role },
    });
  }

  async updateRole(role: string, displayName: string) {
    const roleToUpdate = await this.prisma.stage.findUnique({
      where: { systemName: role },
    });

    if (!roleToUpdate) {
      throw new NotFoundException(`${role} not found`);
    }

    return this.prisma.stage.update({
      where: { systemName: role },
      data: { displayName },
    });
  }
  async resetRoles() {
    await this.prisma.stage.deleteMany();
    const rolesToCreate: {
      systemName: string;
      displayName: string;
      default: boolean;
    }[] = [
      { systemName: 'Prospect', displayName: 'Prospect', default: true },
      {
        systemName: 'Analysis',
        displayName: 'Analysis',
        default: true,
      },
      {
        systemName: 'DueDiligence',
        displayName: 'DueDiligence',
        default: true,
      },
      {
        systemName: 'Day-1',
        displayName: 'Day-1',
        default: true,
      },
      {
        systemName: '100-days',
        displayName: '100-days',
        default: true,
      },
      { systemName: 'Year-1', displayName: 'Year-1', default: true },
      {
        systemName: 'FinalizeIntegration',
        displayName: 'FinalizeIntegration',
        default: true,
      },
    ];

    const createdRolesPromises = rolesToCreate.map((role) => {
      return this.prisma.stage.create({
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

  async saveStages(
    stages: { systemName: string; displayName: string; default: boolean }[],
  ) {
    const updatedStages = [];

    for (const stage of stages) {
      try {
        const updatedStage = await this.prisma.stage.update({
          where: { systemName: stage.systemName },
          data: { displayName: stage.displayName, default: stage.default },
        });
        updatedStages.push(updatedStage);
      } catch (error) {
        if (error instanceof NotFoundException) {
          console.error(
            `Stage with systemName "${stage.systemName}" not found.`,
          );
        } else {
          console.error('An error occurred while saving stages:', error);
        }
      }
    }

    return updatedStages;
  }
}
