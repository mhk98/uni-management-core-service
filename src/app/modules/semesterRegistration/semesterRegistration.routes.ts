import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();
router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);
router.post('/', SemesterRegistrationController.insertIntoDB);
router.get('/', SemesterRegistrationController.getAllFromDB);
router.get('/:id', SemesterRegistrationController.getDataById);
router.get(
  '/get-my-registration',
  SemesterRegistrationController.getMyRegistration
);

router.post(
  '/enroll-into-course',
  auth(ENUM_USER_ROLE.STUDENT),

  SemesterRegistrationController.enrollIntoCourse
);
router.post(
  '/withdraw-from-course',
  SemesterRegistrationController.withdrawFromCourse
);

router.patch('/:id', SemesterRegistrationController.updateOneInDB);
router.delete('/:id', SemesterRegistrationController.deleteFromDB);
router.post(
  '/confirm-my-registration',
  SemesterRegistrationController.confirmMyRegistration
);
router.post(
  '/start-new-semester',
  SemesterRegistrationController.startNewSemester
);

export const SemesterRegistrationRoutes = router;
