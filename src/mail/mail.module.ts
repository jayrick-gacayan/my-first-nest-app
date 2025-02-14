import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST, // Replace with your SMTP server
        port: process.env.MAIL_PORT, // Common SMTP ports: 465 (SSL) or 587 (TLS)
        secure: false, // `true` for SSL, `false` for TLS
        auth: {
          user: process.env.MAIL_USER, // SMTP username
          pass: process.env.MAIL_PASSWORD, // SMTP password
        },
      },
      defaults: {
        from: process.env.MAIL_FROM, // Default sender
      },
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
