import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from '../course/course.controller';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/', FacultyController.getAllFromDB);
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultyController.myCourses
);
router.get('/:id', FacultyController.getDataById);
router.post(
  '/',
  auth(ENUM_USER_ROLE.FACULTY),

  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  validateRequest(FacultyValidation.update),
  FacultyController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  FacultyController.deleteFromDB
);

router.post('/:id/assign-faculties', CourseController.assignFaculties);

export const FacultyRoutes = router;
