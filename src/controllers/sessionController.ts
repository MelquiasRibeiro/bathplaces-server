import jwt from 'jsonwebtoken';
import User from '../database/user';
import authConfig from '../config/auth';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

class SessionController {
  async store(req:Request, res:Response) {

    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(401).json({ erro: 'user not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },

      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
