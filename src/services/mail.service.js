import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: false,
  auth: { user: config.mail.user, pass: config.mail.pass }
});

export async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({ from: config.mail.from, to, subject, html, text });
}