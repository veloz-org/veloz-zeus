const waitlistWelcome = (email: string, appName = "Veloz") => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waitlist - Welcome</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="email-content">
      <p style="font-size: 16px">Hi ${email},</p>

      <p style="font-size: 16px">
        Thank you for joining our waitlist. We will notify you when we are ready
        to launch.
      </p>

      <p style="font-size: 16px">Regards,</p>

      <p style="font-size: 16px">The ${appName} Team</p>
    </div>
  </body>
</html>

    `;
};

export default waitlistWelcome;
