import { sendMail } from "../utils/sendMail";

describe("send email", () => {
  test("sending a mail", () => {
    sendMail("subject", "body", "mail");
  });
});
