/*
  Warnings:

  - The values [WITHDRAW] on the enum `StudentEnrolledCourseStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updateAt` on the `academic_departments` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `creatdAt` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_semester_payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_semester_registration` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `academic_departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `academic_faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `buildings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudentEnrolledCourseStatus_new" AS ENUM ('ONGOING', 'COMPLETED', 'WITHDRAWN');
ALTER TABLE "student_enrolled_courses" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "student_enrolled_courses" ALTER COLUMN "status" TYPE "StudentEnrolledCourseStatus_new" USING ("status"::text::"StudentEnrolledCourseStatus_new");
ALTER TYPE "StudentEnrolledCourseStatus" RENAME TO "StudentEnrolledCourseStatus_old";
ALTER TYPE "StudentEnrolledCourseStatus_new" RENAME TO "StudentEnrolledCourseStatus";
DROP TYPE "StudentEnrolledCourseStatus_old";
ALTER TABLE "student_enrolled_courses" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
COMMIT;

-- DropForeignKey
ALTER TABLE "student_semester_payment" DROP CONSTRAINT "student_semester_payment_academicSemesterId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_payment" DROP CONSTRAINT "student_semester_payment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration" DROP CONSTRAINT "student_semester_registration_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration" DROP CONSTRAINT "student_semester_registration_studentId_fkey";

-- AlterTable
ALTER TABLE "academic_departments" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "academic_faculty" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "buildings" DROP COLUMN "creatdAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "student_semester_payment";

-- DropTable
DROP TABLE "student_semester_registration";

-- CreateTable
CREATE TABLE "student_semester_registrations" (
    "id" TEXT NOT NULL,
    "isConfirmed" BOOLEAN DEFAULT false,
    "totalCreditsTaken" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "student_semester_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_semester_payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "fullPaymentAmount" INTEGER DEFAULT 0,
    "partialPaymentAmount" INTEGER DEFAULT 0,
    "totalDueAmount" INTEGER DEFAULT 0,
    "totalPaidAmount" INTEGER DEFAULT 0,
    "paymentStatus" "PaymentStatus" DEFAULT 'PENDING',

    CONSTRAINT "student_semester_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_academic_infos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalCreditsTaken" INTEGER,
    "cgpa" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "student_academic_infos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_semester_registrations" ADD CONSTRAINT "student_semester_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registrations" ADD CONSTRAINT "student_semester_registrations_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payments" ADD CONSTRAINT "student_semester_payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payments" ADD CONSTRAINT "student_semester_payments_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_academic_infos" ADD CONSTRAINT "student_academic_infos_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
