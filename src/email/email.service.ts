import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private readonly transporter;

    constructor(){
        this.transporter= nodemailer.createTransport({
            service: 'gmail',
            host: 'sandbox.smtp.mailtrap.io',
            port: 587,
            auth:{
                user: '4abeb752214c77',
                pass: '11eaee3b5a6544',
            },
        });
    }

    async sendWelcomeMail(too: string){
        const mailOptions= {
            from: 'vankadarisaikumar7@gmail.com',
            to : 'saikumarvankadari7@gmail.com',
            subject: 'Welcome to X!!!!',
            text: 'Welcome to X! We are excited to have you as a user.'
        };

        try{
            await this.transporter.sendMail(mailOptions);
            console.log("Wlecome mail sent");
        }catch(error){
            console.error("Error sending mail:", error);
        }
    }
}
