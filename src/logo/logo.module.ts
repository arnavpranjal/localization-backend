import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  providers: [LogoService, UploadService],
  controllers: [LogoController],
})
export class LogoModule {}
