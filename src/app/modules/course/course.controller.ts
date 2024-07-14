import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterAbleFields } from './course.constants';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created course',
    data: result,
  });

  console.log(req.body);
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got single data ',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully delete course ',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('facultiesData', req.body.faculties);
  const result = await CourseService.assignFaculties(id, req.body.faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully assign faculties  ',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.removeFaculties(id, req.body.faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully delete faculties  ',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully update course ',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);

  const filters = pick(req.query, courseFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CourseService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got course ',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getDataById,
  deleteByIdFromDB,
  updateOneInDB,
  getAllFromDB,
  assignFaculties,
  removeFaculties,
};
