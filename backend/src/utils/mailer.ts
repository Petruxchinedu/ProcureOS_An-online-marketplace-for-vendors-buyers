import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load env vars specifically for this module
dotenv.config();

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  // We create the transporter INSIDE the function to ensure 
  // env variables are fully loaded when called.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log("Attempting email to:", to);
  console.log("Using User:", process.env.SMTP_USER ? "DEFINED" : "UNDEFINED");

  await transporter.sendMail({
    from: `"BulkBuy" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};