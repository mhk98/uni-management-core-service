export const offeredCourseClassScheduleSearchableFields = ['dayOfWeek'];

export const offeredCourseClassScheduleRelationalFields = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];

export const offeredCourseClassScheduleRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseSectionId: 'offeredCourseSection',
  semesterRegistrationId: 'semesterRegistrationI',
  roomId: 'room',
  facultyId: 'faculty',
};

export const offeredCourseClassScheduleFilterableFields = [
  'searchTerm',
  'dayOfWeek',
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];
