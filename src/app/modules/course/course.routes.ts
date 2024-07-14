import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validations';
const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.insertIntoDB
);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.update),
  CourseController.updateOneInDB
);

router.get('/', CourseController.getAllFromDB);

router.post('/:id/assign-faculties', CourseController.assignFaculties);
router.delete('/:id/remove-faculties', CourseController.removeFaculties);

export const CourseRoutes = router;
