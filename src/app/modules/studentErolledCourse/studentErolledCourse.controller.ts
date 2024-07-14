import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StudentEnrolledCourseService } from "./studentErolledCourse.service";

const insertIntoDB = catchAsync(async(req:Request, res:Response)=>{
    const result = await StudentEnrolledCourseService.insertIntoDB(req.body)


    sendResponse(res,{
        statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully student enrolled course',
    data: result,
    })
})


export const StudentEnrolledCourseController = {
    insertIntoDB
}