import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const { message, ...rest } = data;

        const transformedData = {
          success: true,
          data: rest,
          message,
        };

        const response = context.switchToHttp().getResponse<Response>();

        response.locals.data = transformedData;

        return transformedData;
      }),
    );
  }
}
