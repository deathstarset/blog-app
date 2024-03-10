import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    console.log(exception);
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response
      .status(status)
      .json({ success: false, data: null, message: message });
  }
}
