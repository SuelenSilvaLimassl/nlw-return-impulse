import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c12ba3dfa79a7a",
      pass: "9ce987aaad2daa"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Suelen Lima <suelenilvalimassl@gmail.com>',
            subject,
            html: body,
            });
    }
}