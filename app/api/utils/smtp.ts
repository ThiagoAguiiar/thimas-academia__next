import nodemailer from "nodemailer";

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  user: "projetoifsp.extensao@gmail.com",
  password: "zndx ubsh gefx eotq",
};

// Configurações de SMTP Gmail
const smtpTransport = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: false,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.password,
  },
  tls: { rejectUnauthorized: false },
});

// Envia Emails
export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const result = await smtpTransport.sendMail({
      from: smtpConfig.user,
      to: to,
      subject: subject,
      text: text,
    });

    if (result.accepted.length > 0) {
      return {
        message: "Email enviado com sucesso",
        messageType: "success",
        error: null,
        data: null,
        status: 200,
      };
    }

    return {
      message: "Falha ao enviar email",
      messageType: "danger",
      error: null,
      data: null,
      status: 400,
    };
  } catch (err) {
    throw err;
  }
}
