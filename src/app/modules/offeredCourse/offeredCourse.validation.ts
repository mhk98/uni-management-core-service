import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic department id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester registration id is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course id is required',
      })
    ),
  }),
});

export const OfferCourseValidation = {
  create,
};
