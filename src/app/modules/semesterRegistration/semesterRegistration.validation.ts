import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'startDate is required',
    }),
    endDate: z.string({
      required_error: 'endDate is required',
    }),
    minCredit: z.string({
      required_error: 'minCredit is required',
    }),
    maxCredit: z.string({
      required_error: 'maxCredit is required',
    }),

    academicSemesterId: z.string({
      required_error: 'academicSemesterId is required ',
    }),
  }),
});
const update = z.object({
  body: z.object({
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.string(),
    maxCredit: z.string(),
    academicSemesterId: z.string(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {}
      )
      .optional(),
  }),
});

const enrollOrWithdrawCourse = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offered course id is required',
    }),

    offeredCourseSectionId: z.string({
      required_error: 'Offered course section id',
    }),
  }),
});

export const SemesterValidation = {
  create,
  update,
  enrollOrWithdrawCourse,
};
