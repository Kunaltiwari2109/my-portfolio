import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const EXCEL_FILE_PATH = path.join(__dirname, 'Portfolio_Leads.xlsx');

// Initialize Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Helper: Ensure Excel File Exists
async function ensureExcelFile() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Leads');
    sheet.columns = [
      { header: 'Date', key: 'date', width: 25 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Message', key: 'message', width: 50 },
    ];
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  }
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // 1. Save to Excel
    await ensureExcelFile();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const sheet = workbook.getWorksheet('Leads');
    
    sheet.addRow({
      date: new Date().toLocaleString(),
      name,
      email,
      message
    });
    
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);

    // 2. Send Automated Welcome Email to the Lead
    const isPlaceholderEmail = process.env.EMAIL_USER === 'your_email@gmail.com';
    const isPlaceholderPass = process.env.EMAIL_APP_PASSWORD === 'xxxx_xxxx_xxxx_xxxx';

    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD && !isPlaceholderEmail && !isPlaceholderPass) {
      const mailOptions = {
        from: `"Kunal Tiwari" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for reaching out!',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B5CF6;">Hello ${name},</h2>
            <p>Thank you for getting in touch! I have received your message and will get back to you as soon as possible.</p>
            <br/>
            <p><strong>Your Message:</strong></p>
            <blockquote style="border-left: 4px solid #00F5FF; padding-left: 10px; color: #555;">
              ${message}
            </blockquote>
            <br/>
            <p>Best regards,</p>
            <p><strong>Kunal Tiwari</strong></p>
          </div>
        `,
      };
      
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email, but lead was saved:', emailError.message);
      }
    } else {
      console.log('Skipping email: Placeholder or missing credentials in .env');
    }

    res.status(200).json({ success: true, message: 'Lead saved successfully!' });
  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
