import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { StagesModule } from './stages/stages.module';
import { UploadModule } from './upload/upload.module';
import { LogoModule } from './logo/logo.module';

@Module({
  imports: [
    RolesModule,
    StagesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    LogoModule,
  ],
})
export class AppModule {}
