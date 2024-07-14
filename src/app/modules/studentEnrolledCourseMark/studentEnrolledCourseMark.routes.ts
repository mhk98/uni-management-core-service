import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch('/update-marks');
router.patch(
  '/update-final-marks',
  StudentEnrolledCourseMarkController.updateFinalMarks
);

export const studentEnrolledCourseMarkRoutes = router;
