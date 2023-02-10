import { Request, Response } from 'express';

export const getApiKeys = (req: Request, res: Response) => {
  const key = process.env.TINYMCE_API_KEY;
  res.json({ key });
};
