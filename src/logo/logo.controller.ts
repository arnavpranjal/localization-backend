import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LogoService } from './logo.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('logo')
export class LogoController {
  constructor(private readonly LogoService: LogoService) {}
  @Get()
  async getLogo() {
    const logo = await this.LogoService.getLogo();
    return logo;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file: Express.Multer.File) {
    const fileName = `${file.originalname}`;
    const url = await this.LogoService.uploadLogo(fileName, file.buffer);
    return { url };
  }
}
