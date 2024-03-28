import {
  DeleteObjectCommand,
  GetBucketLocationCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  private s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
  });

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'logobucketnestjs',
        Key: fileName,
        Body: file,
      }),
    );

    const url = `https://logobucketnestjs.s3.${this.configService.getOrThrow(
      'AWS_REGION',
    )}.amazonaws.com/${fileName}`;

    return url;
  }

  async delete(url: string) {
    const fileName = url.split('/').pop();

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'logobucketnestjs',
        Key: fileName,
      }),
    );
    return url;
  }
}
