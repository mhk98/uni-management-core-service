import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationFilterAbleFields } from './semesterRegistration.constants';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully complete registration ',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SemesterRegistrationFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SemesterRegistrationService.getAllFromDB(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully delete semester registration',

    data: result,
  });
});
const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.updateOneInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully update semester registration',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.getDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got semester registration data',

    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );

  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student SemesterRegistration started successfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.enrollIntoCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student semester registration started successfully',
    data: result,
  });
});

const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.enrollIntoCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student semester registration started successfully',
    data: result,
  });
});

const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await SemesterRegistrationService.confirmMyRegistration(
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student semester confirmed successfully',
      data: result,
    });
  }
);

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.getMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data fetched',
    data: result,
  });
});

const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.startMyRegistration(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data fetched',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
  getDataById,
  updateOneInDB,
  startMyRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
  confirmMyRegistration,
  getMyRegistration,
  startNewSemester,
};
