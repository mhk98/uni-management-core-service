import { StudentEnrolledCourse } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async(data:StudentEnrolledCourse): Promise<StudentEnrolledCourse> => {

    const result = await prisma.studentEnrolledCourse.create({data})

    return result
}


export const StudentEnrolledCourseService = {
    insertIntoDB
}