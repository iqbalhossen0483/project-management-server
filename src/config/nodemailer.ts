import nodemailer from 'nodemailer';
import config from './config';

export const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: config.mailtrap.user,
    pass: config.mailtrap.pass,
  },
});
