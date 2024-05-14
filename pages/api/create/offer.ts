import fs from "fs";
import Imap from "imap";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addTextToPDF,
  convertHTMLToPDF,
} from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";
import { Company } from "@/create/invoice/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { email, name, html, css, providerName, heading } = req.body;
    const fileName = `оферта-${heading}-${name}.pdf`;
    const offerFolder = "оферти";
    const companyFolder =
      providerName === Company.ekoHome
        ? "Еко Хоум"
        : Company.satecma
        ? "Сатекма"
        : "";
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = new Date().getFullYear();

    try {
      createDir(`/Users/antoshef/Satecma/фактури/${companyFolder}`);
      createDir(`/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени`);
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${offerFolder}`
      );
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${offerFolder}/${currentYear}`
      );
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${offerFolder}/${currentYear}/${currentMonth}`
      );
      const localFilePath = `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${offerFolder}/${currentYear}/${currentMonth}/${fileName}`;

      const pdfBuffer = await convertHTMLToPDF(html, css);
      const modifiedPdfBuffer = pdfBuffer && (await addTextToPDF(pdfBuffer));
      modifiedPdfBuffer &&
        (await fs.promises.writeFile(localFilePath, modifiedPdfBuffer));

      const transporter = nodemailer.createTransport({
        host: process.env.IMAP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
        to: email,
        subject: "Your Offer",
        text: "Please find attached your offer.",
        attachments: [
          {
            filename: fileName,
            path: localFilePath,
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred: " + error.message);
          return;
        }

        console.log("Message sent: %s", info.messageId);

        const imapConfig = {
          user: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
          password: process.env.EMAIL_PASS,
          host: process.env.IMAP_HOST,
          port: 993,
          tls: true,
          tlsOptions: { rejectUnauthorized: false },
        };

        const imap = new Imap(imapConfig);

        imap.once("ready", () => {
          imap.openBox("INBOX", false, (err, box) => {
            if (err) {
              console.error("Error opening inbox:", err);
              imap.end();
              return;
            }

            const message = [
              `From: ${mailOptions.from}`,
              `To: ${mailOptions.to}`,
              `Subject: ${mailOptions.subject}`,
              `MIME-Version: 1.0`,
              `Content-Type: multipart/mixed; boundary="boundary"`,
              ``,
              `--boundary`,
              `Content-Type: text/plain; charset=utf-8`,
              ``,
              mailOptions.text,
              ``,
              `--boundary`,
              `Content-Type: application/pdf; name="${mailOptions.attachments[0].filename}"`,
              `Content-Disposition: attachment; filename="${mailOptions.attachments[0].filename}"`,
              `Content-Transfer-Encoding: base64`,
              ``,
              fs
                .readFileSync(mailOptions.attachments[0].path)
                .toString("base64"),
              ``,
              `--boundary--`,
              ``,
            ].join("\r\n");

            // Append the raw message to the Sent folder
            imap.append(
              message,
              { mailbox: "INBOX.Sent", flags: ["\\Seen"] },
              (err) => {
                if (err) {
                  console.error("Error saving to Sent folder:", err);
                } else {
                  console.log("Message saved to Sent folder");
                }
                imap.end();
              }
            );
          });
        });

        imap.once("error", (err: any) => {
          console.error("IMAP error:", err);
        });

        imap.once("end", () => {
          console.log("IMAP connection ended");
        });

        imap.connect();
      });

      res.status(200).json({ message: "Offer generated and sent!" });
    } catch (error) {
      console.error("Error in offer generation or sending email:", error);
      res.status(500).json({ message: "Error generating or sending offer." });
    }
  }
}
