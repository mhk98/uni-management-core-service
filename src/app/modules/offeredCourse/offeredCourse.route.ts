import express from 'express';
import { OfferCourseController } from './offeredCourse.controller';
const router = express.Router();

router.post('/', OfferCourseController.insertIntoDB);
router.get('/', OfferCourseController.getAllFromDB);
export const offerCourseRoutes = router;
