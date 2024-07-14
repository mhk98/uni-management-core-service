import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { StudentSearchAbleFields } from './student.constants';
import { IStudentFilterRequest } from './student.interface';

const insertIntoDB = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  console.log(filterData, filters);

  const andConditinos = [];

  if (searchTerm) {
    andConditinos.push({
      OR: StudentSearchAbleFields.map(field => ({
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditinos.length > 0 ? { AND: andConditinos } : {};

  const result = await prisma.student.findMany({
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
  const total = await prisma.student.count();

  return {
    meta: {
      total,
      page,
      limit,
    },

    data: result,
  };
};

const getDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: { id },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: { id },
  });

  return result;
};


const myCourses = async(authUserId:string, filter: {
  
  courseId?: string | undefined,
  academicSemesterId?: string | undefined

}) =>{

  if(!filter.academicSemesterId){
    const currentSemester = await prisma.academicSemester.findFirst({
      where:{
        isCurrent: true
      }
    })

    filter.academicSemesterId = currentSemester?.id
  }

const result = await prisma.studentEnrolledCourse.findMany({
  where:{
    student:{
      studentId:authUserId
    },
    ...filter
  }, 
  include: {
    course: true
  }
})
return result
}
export const StudentService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  myCourses
};
