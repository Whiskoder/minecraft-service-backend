import { Injectable } from '@nestjs/common';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

import { envs } from '@config/envs.config';

@Injectable()
export class BucketService {
  private readonly S3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.S3Client = new S3Client({
      region: 'auto',
      credentials: {
        accessKeyId: envs.bucket.clientId,
        secretAccessKey: envs.bucket.clientSecret,
      },
      endpoint: envs.bucket.endpoint,
    });
    this.bucketName = envs.bucket.name;
  }

  putObject(key: string, file: Express.Multer.File) {
    const putParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(putParams);
    return this.S3Client.send(command);
  }

  getObject(key: string) {
    const getParams = {
      Bucket: this.bucketName,
      Key: key,
      range: 'bytes=0-9',
    };

    const command = new GetObjectCommand(getParams);
    return this.S3Client.send(command);
  }

  deleteObject(key: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
      range: 'bytes=0-9',
    };
    const command = new DeleteObjectCommand(deleteParams);
    return this.S3Client.send(command);
  }
}
