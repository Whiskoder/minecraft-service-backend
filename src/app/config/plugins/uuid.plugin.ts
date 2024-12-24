import { v4 as uuidv4 } from 'uuid';
import { v7 as uuidv7 } from 'uuid';

export const uuid = {
  v4: () => uuidv4(),
  v7: () => uuidv7(),
};
