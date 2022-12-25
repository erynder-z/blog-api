import { NextFunction, Request, Response } from 'express';

interface Error {
  name: string;
  message: string;
  stack?: string;
  status?: number;
}

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
}
export default errorMiddleware;
