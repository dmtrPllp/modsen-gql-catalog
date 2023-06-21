import { Request } from 'express';

import { User } from '@app/db-lib';

export interface RequestWithUser extends Request {
  user: User;
}
