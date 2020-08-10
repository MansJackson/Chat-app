import express, { Request, Response } from 'express';
import { isValidName, getUsers } from '../util';

const router = express.Router();

router.get('/users/:nickname', (req: Request, res: Response) => {
  const users = getUsers();
  const { nickname } = req.params;
  if (!isValidName(nickname)) {
    res.status(400).json({ valid: false, message: 'Nickname must be atleast 1 character and contain only letters' });
    return;
  }
  if (users.length > 0 && nickname && users.find((el) => el === nickname.toLowerCase())) {
    res.status(409).json({ valid: false, message: `${nickname} is already in use` });
    return;
  }
  res.status(200).json({ valid: true, message: '' });
});

router.get('/users', (req: Request, res: Response) => {
  const users = getUsers();
  res.status(200).json(users);
});

export default router;
