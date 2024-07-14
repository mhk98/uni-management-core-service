import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyFilterAbleFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log('insertIntoDB', req.body);

  const result = await FacultyService.insertIntoDB(req.body);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);

  const filters = pick(req.query, FacultyFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  console.log('filters', filters);
  console.log('options', options);
  const result = await FacultyService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getDataById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fetched',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FacultyService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty semester  updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty semester delete successfully',
    data: result,
  });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('facultiesData', req.body.faculties);
  const result = await FacultyService.assignCourses(id, req.body.courses);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully assign faculties  ',
    data: result,
  });
});
const removeCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.removeCourses(id, req.body.courses);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully delete faculties  ',
    data: result,
  });
});
const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await FacultyService.myCourses();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My courses data fetch successfully  ',
    data: result,
  });
});

export const FacultyController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignCourses,
  removeCourses,
  myCourses,
};
