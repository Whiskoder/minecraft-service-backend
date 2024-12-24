import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const handleExceptions = (error: any, $logger: Logger) => {
  if (error instanceof HttpException) throw error;

  if (error.code === '23505') throw new BadRequestException(error.detail);

  $logger.error(error);
  throw new InternalServerErrorException('Internal Server Error');
};
