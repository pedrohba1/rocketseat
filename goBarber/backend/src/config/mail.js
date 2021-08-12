export default {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>',
    },
};

// tipos de serviço de envio de email para uso:
// AMAZON SE
// MAILGUN
// Sparkspot
// Mandril
// Mailchimp
// Mailtrap -> funciona apenas para ambiente de desenvolvimento
