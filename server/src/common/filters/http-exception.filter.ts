import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request  = ctx.getRequest<Request>();

    // Si la réponse est déjà partie — on ne fait rien
    if (response.headersSent) return;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Erreur interne du serveur';

    this.logger.error(
      `${request.method} ${request.url} — ${status} — ${message}`,
    );

    response.status(status).json({
      success:   false,
      status,
      message,
      path:      request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
