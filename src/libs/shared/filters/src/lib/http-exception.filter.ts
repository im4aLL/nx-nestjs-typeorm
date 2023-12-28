import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AlreadyExistsError, NotFoundError } from '@nx-nestjs-typeorm/errors';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(Error)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  override catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;
    let status = null;

    if (exception instanceof NotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof AlreadyExistsError) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
    }

    if (status) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
