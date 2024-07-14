import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { FacultySearchAbleFields } from './faculty.constants';
import { IFacultyFilterRequest } from './faculty.interface';

const insertIntoDB = async (FacultyData: Faculty): Promise<Faculty> => {
  console.log('FacultyData', FacultyData);
  const result = await prisma.faculty.create({
    data: FacultyData,
  });

  return result;
};

const getAllFromDB = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  console.log(filterData, filters);

  const andConditinos = [];

  if (searchTerm) {
    andConditinos.push({
      OR: FacultySearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditinos.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FacultyWhereInput =
    andConditinos.length > 0 ? { AND: andConditinos } : {};

  const result = await prisma.faculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  console.log(filters);
  const total = await prisma.faculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },

    data: result,
  };
};

const getDataById = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: { id },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: { id },
  });

  return result;
};

const assignCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  if (!Array.isArray(payload)) {
    throw new Error('Payload must be an array');
  }

  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const assignCoursesData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },

    include: {
      course: true,
    },
  });

  return assignCoursesData;
};

const removeCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });

  const assignCoursesData = await prisma.courseFaculty.findMany({
    where: { facultyId: id },
    include: {
      course: true,
    },
  });

  return assignCoursesData;
};

const myCourses = async () => {
  console.log('my courses');
};
export const FacultyService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignCourses,
  removeCourses,
  myCourses,
};
