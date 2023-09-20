const nodemailer = require("nodemailer");
// const { DateTime } = require("luxon");
// const now = DateTime.now().toFormat("dd LLL yyyy - cccc");

async function mailer(status, now) {
  let transporter = nodemailer.createTransport({
    pool: true,
    maxMessages: 2,
    maxConnections: 3,
    rateDelta: 2000,
    rateLimit: 15,
    host: process.env.M_HOST,
    port: process.env.M_PORT,
    secure: process.env.M_SECURE,
    requireTLS: true,
    auth: {
      user: process.env.M_AUTH_USER,
      pass: process.env.M_AUTH_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
    service: process.env.M_SERVICE,
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: `Status Report ${now.toFormat("dd LLL yyyy - cccc")}`,
    text: status,
  });

  return info;
}

module.exports = mailer;
