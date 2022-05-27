import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, req, res, next) => {
  console.log(next);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(status).json({ error: message });
};

export default error;
