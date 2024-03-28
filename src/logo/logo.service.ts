import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class LogoService {
  private prisma: PrismaClient;
  constructor(private uploadService: UploadService) {
    this.prisma = new PrismaClient();
  }

  async getLogo() {
    const logo = await this.prisma.logo.findFirst();
    return logo?.url;
  }

  async uploadLogo(fileName: string, file: Buffer) {
    const existinglogo = await this.prisma.logo.findFirst();
    if (existinglogo && existinglogo.url) {
      await this.uploadService.delete(existinglogo.url);
    }

    await this.prisma.logo.deleteMany();

    const url = await this.uploadService.upload(fileName, file);
    await this.prisma.logo.create({ data: { url } });
    return url;
  }
}
