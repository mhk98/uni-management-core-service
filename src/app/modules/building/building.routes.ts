import express from 'express';
import { BuildingController } from './building.controller';
const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(BuildingValidations.create),
  BuildingController.insertIntoDB
);
router.get('/', BuildingController.getAllFromDB);

export const BuildingRoutes = router;
