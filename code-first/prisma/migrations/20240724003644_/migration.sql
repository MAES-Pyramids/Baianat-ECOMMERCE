/*
  Warnings:

  - A unique constraint covering the columns `[userId,otpType]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "otp_userId_otpType_key" ON "otp"("userId", "otpType");
