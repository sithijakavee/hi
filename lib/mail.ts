// import { Resend } from "resend";
import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendVerificationEmail = async (email: string, token: string) => {
//     const confirmLink = `http://localhost:3000/new-verification?token=${token}`

//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Verify your email address",
//         html: `<p>Click the link below to verify your email address: <a href="${confirmLink}">here</a></p>`
//     })
// }

interface EmailProps {
  email: string;
  subject: string;
  html: string;
}

export const sendEmail = (email: string, subject: string, text: string) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: "Hi",
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
