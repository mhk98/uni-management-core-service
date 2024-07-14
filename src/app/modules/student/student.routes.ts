import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllFromDB);
router.get('/my-courses', auth(ENUM_USER_ROLE.STUDENT), StudentController.myCourses);
router.get('/:id', StudentController.getDataById);
router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  // validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  validateRequest(StudentValidation.update),
  StudentController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  StudentController.deleteFromDB
);

export const StudentRoutes = router;
