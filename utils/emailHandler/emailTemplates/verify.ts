export const emailVerificationTemplate = (verificationLink: string) => `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    @media screen and (max-width: 600px) {
      .primary-button {
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e8f1fc;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width: 100%; background-color: #e8f1fc;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td bgcolor="#001044" style="padding: 20px 10px;">
              <img src="${process.env.NEXT_PUBLIC_APP_URL}images/logo.png" alt="precision-light.png" width="120" height="30" style="max-width: 150px; display: block; margin: 0 auto;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="text-align: center;">
                      <img src="${process.env.NEXT_PUBLIC_APP_URL}images/Shield-check.png" alt="shield-check.png" width="20" height="20" style="margin-bottom: 20px;" />
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                      <h2 style="color: #001044; font-size: 24px; font-weight: 700; margin: 0;">Please verify your Precision survey</h2>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                      <p style="color: #001044; font-size: 14px; font-weight: 400; margin: 0;">Verify now to get started in your Precision survey by clicking below.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
                      <tr>
                        <td align="center" bgcolor="#297afc" style="border-radius: 20px;">
                          <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 700;">Verify Now</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 40px;">
                    <hr style="border: none; border-top: 1px solid #ccc; width: 100%; margin: 0 auto;">
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 20px;">
                  <p style="color: rgba(41, 122, 252, 0.5); font-size: 12px; font-weight: 400; margin: 0; ">You've received this email because you registered for the Precision Survey by Precision. Please refer to the Precision's Terms and Conditions for details.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
