export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string;
};

export type IEnrollCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
