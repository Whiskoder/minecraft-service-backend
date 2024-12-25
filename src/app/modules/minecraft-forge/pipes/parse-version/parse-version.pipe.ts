import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseVersionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const versionRegex = /^\d+\.\d+\.\d+$/;
    if (typeof value !== 'string' || !versionRegex.test(value))
      throw new BadRequestException(
        'Invalid version format. Expected format: x.x.x',
      );

    return value;
  }
}
