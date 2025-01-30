import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { logger } from "../application/logging";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { User } from "../database/entity/User";

export class Email {
    private static transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT!),
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    static async isVerifiedEmail(email: string): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email: email });

        return user?.email_verified_at !== null;
    }

    static sendVerificationEmail(email: string, code: string) {
        const verificationLink = `${
            process.env.APP_URL
        }/api/verify-email?token=${encodeURIComponent(code)}`;
        ejs.renderFile(
            path.join(__dirname, "../view/mail/verification.mail.ejs"),
            { code: verificationLink },
            (err, data) => {
                if (err) {
                    console.log(err);
                    logger.error(err);
                } else {
                    this.transporter.sendMail(
                        {
                            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
                            to: email,
                            subject: "Verification your email",
                            text: "Verification your email",
                            html: data
                        },
                        (error, info) => {
                            if (error) {
                                console.log(error);
                                logger.error(error);
                            } else {
                                console.log(
                                    `Send verification email successfull to ${info.messageId}`
                                );
                                logger.info(
                                    `Send verification email successfull to ${info.messageId}`
                                );
                            }
                        }
                    );
                }
            }
        );
    }
}
