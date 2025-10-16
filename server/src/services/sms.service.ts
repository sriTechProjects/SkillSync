import twilio from "twilio";
const accountId = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const phnno = process.env.PHN_NUMBER;

if (!accountId || !authToken || !phnno) {
  throw new Error("Twilio environment variables are not fully configured.");
}

const client = twilio(accountId, authToken);

class SmsService {
  public async sendOtp(to: string, otp: string) {
    try {
      const message = await client.messages.create({
        body: `Your SkillSync verification code is: ${otp}`,
        from: phnno,
        to: to, 
      });
    } catch (error) {}
  }
}

export const smsService = new SmsService();