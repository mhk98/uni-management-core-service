import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemsterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/', AcademicSemsterController.getAllFromDB);
router.get('/:id', AcademicSemsterController.getDataById);
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemsterController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  validateRequest(AcademicSemesterValidation.update),
  AcademicSemsterController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  AcademicSemsterController.deleteFromDB
);

export const AcademicSemesterRoutes = router;
