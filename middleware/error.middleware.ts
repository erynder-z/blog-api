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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}
export default errorMiddleware;
