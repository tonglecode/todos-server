"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EmailSender {
    constructor() {
        if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
            throw new Error("Mailjet API credentials are required");
        }
        this.mailjet = new node_mailjet_1.default({
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_API_SECRET,
        });
    }
    async sendEmail(config) {
        try {
            const { from, to, subject, text, html } = config;
            const request = await this.mailjet
                .post("send", { version: "v3.1" })
                .request({
                Messages: [
                    {
                        From: {
                            Email: from.email,
                            Name: from.name,
                        },
                        To: [
                            {
                                Email: to.email,
                                Name: to.name,
                            },
                        ],
                        Subject: subject,
                        TextPart: text,
                        HTMLPart: html,
                    },
                ],
            });
            return request.body;
        }
        catch (error) {
            console.error("Failed to send email:", error);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}
exports.default = EmailSender;
//# sourceMappingURL=sendEmail.js.map