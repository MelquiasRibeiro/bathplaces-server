import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { Request, Response,NextFunction } from 'express';

export default async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'sem token' });
  }

  const [, token] = authHeader.split(' ');

  jwt.verify(token, authConfig.secret, function(err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'invalid token' });
    
    req.userId = decoded?.id;
    return next();
  })
};


