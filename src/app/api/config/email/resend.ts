import { Resend } from "resend";
import env from "../env";
import HttpException from "../../utils/exception";
import { RESPONSE_CODE } from "../../types";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function resendSendMail(
  to: string[] | string,
  subject: string,
  htmlData: string
) {
  const { data, error } = await resend.emails.send({
    from: env.MAIL_FROM,
    to: typeof to === "string" ? [to] : to,
    subject,
    html: htmlData,
  });

  if (error) {
    console.log("❌ Email failed to send");
    console.log(error);
    // throw new HttpException(
    //   RESPONSE_CODE.EMAIL_FAILED_TO_SEND,
    //   "Email failed to send",
    //   500
    // );
    return;
  }

  console.log(`✅ Email sent to ${to}`);
  console.log("Email Data", data);
}
