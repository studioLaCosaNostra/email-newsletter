import * as nodemailer from 'nodemailer';

export async function sendMail(transport: nodemailer.TransportOptions, mailOptions: nodemailer.SendMailOptions) {
  const transporter = nodemailer.createTransport(transport);
  await transporter.sendMail(mailOptions);
}
