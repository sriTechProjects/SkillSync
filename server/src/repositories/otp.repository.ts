import {prisma} from '../config/prisma';
import { Otp } from '@prisma/client';

class OtpRepository {
  public async create(phoneNumber: string, code: string, expiresAt: Date): Promise<Otp> {
    return prisma.otp.create({
      data: {
        phoneNumber,
        code,
        expiresAt,
      },
    });
  }

  // We'll need these methods for the verification step later
  public async find(phoneNumber: string, code: string): Promise<Otp | null> {
    return prisma.otp.findUnique({
      where: {
        phoneNumber_code: {
          phoneNumber,
          code,
        },
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.otp.delete({ where: { id } });
  }

  // Good practice: delete any old OTPs for this number before creating a new one
  public async deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await prisma.otp.deleteMany({ where: { phoneNumber } });
  }
}

export const otpRepository = new OtpRepository();