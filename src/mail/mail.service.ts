import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as ejs from 'ejs';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpMail(data: { email: string } & Record<string, any>) {
    try {
      const html = await this.renderingTemplate('otp-template', data);

      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Welcome!',
        html,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async sendResetPasswordMail(data: { email: string } & Record<string, any>) {
    try {
      const html = await this.renderingTemplate(
        'reset-password-template',
        data,
      );

      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Password Reset!',
        html,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  private async renderingTemplate(
    templateName: string,
    data: Record<string, any>,
  ) {
    const templatePath = join(__dirname, 'templates', `${templateName}.ejs`);

    const template = readFileSync(templatePath, 'utf-8');

    return ejs.render(template, data);
  }
}
