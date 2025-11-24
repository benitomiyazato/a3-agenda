require("dotenv").config();
const nodemailer = require("nodemailer");
const { listarCompromissos, buscarCompromissoPorId } = require("./data/compromissos");

// CONFIGURAÇÃO SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function verificarCompromissos() {
  console.log("Verificando compromissos...");

  const agora = new Date();

  listarCompromissos().forEach((comp) => {
    const inicio = new Date(comp.dataInicio);

    // cria um horário 15 minutos antes do compromisso
    const quinzeMinAntes = new Date(inicio);
    quinzeMinAntes.setMinutes(inicio.getMinutes() - 15);

    // dispara se estamos entre (t-15min) e (t)
    const deveDisparar =
      agora >= quinzeMinAntes &&
      agora < inicio &&
      !comp.notificado;

    if (deveDisparar) {
      console.log(`Disparando email para compromisso ID ${comp.id}`);
      enviarEmail(comp);
    }
  });
}


function enviarEmail(comp) {
  if (!comp) return;

  const formatarData = (d) =>
    new Date(d).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agendaapp59@gmail.com",
    subject: `Lembrete: ${comp.titulo} começa em 15 minutos`,
    html: `
      <h2>${comp.titulo}</h2>
      <p>${comp.descricao}</p>

      <p><strong>Início:</strong> ${formatarData(comp.dataInicio)}</p>
      <p><strong>Fim:</strong> ${formatarData(comp.dataFim)}</p>

      <p><strong>Local:</strong> ${comp.local}</p>
      <p><strong>Categoria:</strong> ${comp.categoria}</p>
      <p><strong>Link:</strong> ${comp.link}</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Erro ao enviar email:", err);
    } else {
      console.log("Email enviado:", info.response);
      comp.notificado = true
      console.log(buscarCompromissoPorId(comp.id))
    }
  });
}


verificarCompromissos();
setInterval(verificarCompromissos, 60 * 1000);

console.log("Monitor de compromissos iniciado…");
