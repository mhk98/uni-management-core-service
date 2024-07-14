import express from 'express';

import { RoomController } from './room.controller';

const router = express.Router();

router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.insertIntoDB
);
router.get('/', RoomController.getAllFromDB);

export const RoomRoutes = router;
