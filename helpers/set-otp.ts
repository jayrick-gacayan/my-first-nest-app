import { UserVerification } from '@prisma/client';
import { randomBytes } from 'crypto';

export function setOtp(): Pick<
  UserVerification,
  'otpCode' | 'token' | 'expiredAt'
> {
  const otpCode = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);

  return {
    otpCode,
    expiredAt,
    token: Buffer.from(randomBytes(32))
      .toString('base64')
      .replace(/\W/g, '')
      .slice(0, 32),
  };
}
