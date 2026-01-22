import { transport } from '../config/nodemailer';

const emailBody = ({ INVITE_LINK, YEAR }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Invitation to Join Suhas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 30px 0;">
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;"
          >
            <!-- Header -->
            <tr>
              <td style="background-color: #0d5c63; padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px;">
                  Welcome to Suhas
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px; color: #333333;">
                <p style="font-size: 16px; margin: 0 0 16px;">
                  Hello,
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                  You have been invited to join <strong>Suhas</strong>.
                  Click the button below to complete your registration and get started.
                </p>

                <!-- Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a
                    href="${INVITE_LINK}"
                    target="_blank"
                    style="
                      background-color: #0d5c63;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 14px 28px;
                      border-radius: 6px;
                      font-size: 16px;
                      display: inline-block;
                    "
                  >
                    Complete Registration
                  </a>
                </div>

                <p style="font-size: 14px; line-height: 1.6; color: #666666;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size: 14px; word-break: break-all; color: #0d5c63;">
                  ${INVITE_LINK}
                </p>

                <p style="font-size: 14px; color: #666666; margin-top: 30px;">
                  This invitation link may expire for security reasons. If you didn’t expect this email, you can safely ignore it.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f0f3f5; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #777777;">
                  © ${YEAR} Suhas. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export const sendInvitationEmail = async (INVITE_LINK: string) => {
  transport.sendMail({
    from: 'iqbalhossen60483@gmail.com',
    to: 'hr@suhas.com',
    subject: 'Invitation for registration link',
    html: emailBody({ INVITE_LINK, YEAR: new Date().getFullYear() }),
  });
};
