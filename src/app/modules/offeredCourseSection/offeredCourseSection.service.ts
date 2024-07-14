import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { OfferedCourseClassScheduleUtils } from '../offeredCourseClassSchedule/offeredCourseClassSchedule.utils';
import { IClassSchedule, IOfferedCourseSectionCreate } from './offeredCourseSection.interface';

const insertIntoDB = async (
  payload: IOfferedCourseSectionCreate
): Promise<OfferedCourseSection | null> => {

  const {classSchedules, ...data} = payload;

  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered course does not exist');
  }


  await asyncForEach(classSchedules, async(schedule: any) =>{
    await OfferedCourseClassScheduleUtils.checkRoomAvailable(schedule)
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(schedule)
  })


const offeredCourseSectionData = await prisma.offeredCourseSection.findFirst({
  where: {
    offeredCourse: {
      id: data.offeredCourseId
    },
    title: data.title
  }
})

if(offeredCourseSectionData) {
  throw new ApiError(httpStatus.BAD_REQUEST, 'Course section already exists')
}


const createSection = await prisma.$transaction(async (transactionClient) => {
  const createOfferedCourseSection = await transactionClient.offeredCourseSection.create({
      data: {
        title: data.title,
        maxCapacity: data.maxCapacity,
        offeredCourseId: data.offeredCourseId,
        semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId
      }
  });

  const scheduleData = classSchedules.map((schedule: IClassSchedule) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: createOfferedCourseSection.id,
      semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId
  }))

   const createSchedules = await transactionClient.offeredCourseClassSchedule.createMany({
  data:scheduleData
 })

  return createOfferedCourseSection;
});

const result = await prisma.offeredCourseSection.findFirst({
  where:{
    id: createSection.id
  },
  include: {
    offeredCourse: {
      include:{
    course: true

      }
    },

    offeredCourseClassSchedules: {
      include:{
        room:{
          include:{
            building:true
          }
        },
        faculty:true
      }
    }
  }
})

return result
};

export const OfferedCourseSectionService = {
  insertIntoDB,
};
