import nodemailer from "nodemailer"

type ContactEmailInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subjectKey: "partenariat" | "avis" | "rejoindre" | "general"
  subjectLabel: string
  message: string
}

type MailRuntime = {
  mailHost: string
  mailPort: string
  mailSecure: string
  mailUser: string
  mailPass: string
  mailFrom: string
  mailTo: string
}

let transporter: nodemailer.Transporter | null = null
let transporterKey = ""

function getMailRuntime(): MailRuntime {
  const config = useRuntimeConfig()
  return {
    mailHost: String(config.mailHost || process.env.MAIL_HOST || process.env.SMTP_HOST || ""),
    mailPort: String(config.mailPort || process.env.MAIL_PORT || process.env.SMTP_PORT || "587"),
    mailSecure: String(config.mailSecure || process.env.MAIL_SECURE || process.env.SMTP_SECURE || "false"),
    mailUser: String(config.mailUser || process.env.MAIL_USER || process.env.SMTP_USER || ""),
    mailPass: String(
      config.mailPass ||
        process.env.MAIL_PASS ||
        process.env.SMTP_PASSWORD ||
        process.env.SMTP_PASS ||
        "",
    ),
    mailFrom: String(
      config.mailFrom ||
        process.env.MAIL_FROM ||
        process.env.SMTP_FROM ||
        process.env.MAIL_USER ||
        process.env.SMTP_USER ||
        "",
    ),
    mailTo: String(config.mailTo || process.env.MAIL_TO || "aminasow98@gmail.com"),
  }
}

function getTransporter() {
  const mail = getMailRuntime()
  const host = mail.mailHost
  const port = Number(mail.mailPort || 587)
  const secure = mail.mailSecure === "true"
  const user = mail.mailUser
  const pass = mail.mailPass

  if (!host || !user || !pass) {
    throw new Error(
      "Mail configuration manquante: définis MAIL_HOST/SMTP_HOST, MAIL_USER/SMTP_USER et MAIL_PASS/SMTP_PASSWORD.",
    )
  }

  const key = `${host}|${port}|${secure}|${user}|${pass}`
  if (transporter && transporterKey === key) return transporter

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
  transporterKey = key

  return transporter
}

function getMailTo() {
  return getMailRuntime().mailTo || "aminasow98@gmail.com"
}

function getMailFrom() {
  const mail = getMailRuntime()
  return mail.mailFrom || mail.mailUser
}

function assertNoHeaderInjection(value: string, fieldName: string) {
  if (value.includes("\n") || value.includes("\r")) {
    throw new Error(`Valeur invalide (${fieldName}): caractères de saut de ligne détectés.`)
  }
}

export async function sendContactEmail(input: ContactEmailInput) {
  const to = getMailTo()
  const from = getMailFrom()

  if (!from) {
    throw new Error("Mail configuration manquante: définis MAIL_FROM ou MAIL_USER/SMTP_USER.")
  }

  assertNoHeaderInjection(input.firstName, "firstName")
  assertNoHeaderInjection(input.lastName, "lastName")
  assertNoHeaderInjection(input.email, "email")
  assertNoHeaderInjection(input.subjectLabel, "subjectLabel")
  if (input.phone) {
    assertNoHeaderInjection(input.phone, "phone")
  }

  const fullName = [input.firstName, input.lastName].filter(Boolean).join(" ")
  const subjectFromPerson =
    fullName.trim().length > 0 ? fullName.trim() : input.email

  const text = [
    "Vous avez reçu un nouveau message via le formulaire de contact.",
    "",
    `Nom: ${fullName || "(non renseigné)"}`,
    `Email: ${input.email}`,
    `Telephone: ${input.phone || "(non renseigné)"}`,
    `Sujet: ${input.subjectLabel}`,
    "",
    "Message:",
    input.message,
  ]
    .filter(Boolean)
    .join("\n")

  const transport = getTransporter()

  // `replyTo` permet de répondre directement à l'expéditeur.
  return transport.sendMail({
    from,
    to,
    replyTo: {
      name: subjectFromPerson,
      address: input.email,
    },
    subject: `MEGA - ${input.subjectLabel} - ${subjectFromPerson}`,
    text,
  })
}

export type QuoteAttachment = {
  filename: string
  content: Buffer
  contentType?: string
}

type QuoteEmailInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  serviceTitle: string
  projectDescription: string
  attachments?: QuoteAttachment[]
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function slugifyFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 48)
}

export async function sendQuoteEmail(input: QuoteEmailInput) {
  const to = getMailTo()
  const from = getMailFrom()

  if (!from) {
    throw new Error("Mail configuration manquante: définis MAIL_FROM ou MAIL_USER/SMTP_USER.")
  }

  assertNoHeaderInjection(input.firstName, "firstName")
  assertNoHeaderInjection(input.lastName, "lastName")
  assertNoHeaderInjection(input.email, "email")
  assertNoHeaderInjection(input.serviceTitle, "serviceTitle")
  if (input.phone) {
    assertNoHeaderInjection(input.phone, "phone")
  }

  const fullName = [input.firstName, input.lastName]
    .filter((part) => part && part !== "-")
    .join(" ")
  const subjectFromPerson =
    fullName.trim().length > 0 ? fullName.trim() : input.email

  const uploadedFiles = (input.attachments || []).filter(
    (file) => file?.filename && file?.content,
  )

  const { buildQuoteAnswersPdf } = await import("./quote-pdf")
  const pdfBuffer = await buildQuoteAnswersPdf({
    serviceTitle: input.serviceTitle,
    fullName: fullName || "(non renseigné)",
    email: input.email,
    phone: input.phone,
    projectDescription: input.projectDescription,
    images: uploadedFiles,
  })

  const stamp = new Date().toISOString().slice(0, 10)
  const pdfName = `formulaire-decouverte-${slugifyFilename(input.serviceTitle) || "mega"}-${slugifyFilename(subjectFromPerson) || "client"}-${stamp}.pdf`

  const text = [
    "Nouveau formulaire de découverte reçu via le site MEGA.",
    "",
    `Service: ${input.serviceTitle}`,
    "",
    "Coordonnées:",
    `Nom: ${fullName || "(non renseigné)"}`,
    `Email: ${input.email}`,
    `Telephone: ${input.phone || "(non renseigné)"}`,
    "",
    "Les réponses complètes sont en pièce jointe (PDF).",
    uploadedFiles.length
      ? `Fichiers joints: ${uploadedFiles.map((file) => file.filename).join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n")

  const safeName = escapeHtml(fullName || "(non renseigné)")
  const safeEmail = escapeHtml(input.email)
  const safePhone = escapeHtml(input.phone || "(non renseigné)")
  const phoneHref = input.phone
    ? `tel:${escapeHtml(input.phone.replace(/\s+/g, ""))}`
    : ""

  const html = `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f2f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
    <div style="background:#111;color:#fff;border-radius:18px 18px 0 0;padding:22px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#e44545;font-weight:700;">MEGA · Formulaire</p>
      <h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;">Formulaire de découverte — ${escapeHtml(input.serviceTitle)}</h1>
    </div>
    <div style="background:#fff;border:1px solid #ece7e4;border-top:0;border-radius:0 0 18px 18px;padding:24px;">
      <p style="margin:0 0 18px;color:#666;font-size:14px;line-height:1.5;">
        Un nouveau formulaire a été soumis depuis le site. Répondre à ce mail contacte directement le client.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 18px;background:#faf8f7;border-radius:14px;">
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;width:34%;">Nom</td>
          <td style="padding:14px 16px;color:#111;font-size:14px;font-weight:600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;">Email</td>
          <td style="padding:14px 16px;font-size:14px;font-weight:600;">
            <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:underline;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;">Téléphone</td>
          <td style="padding:14px 16px;font-size:14px;font-weight:600;">
            ${
              phoneHref
                ? `<a href="${phoneHref}" style="color:#2563eb;text-decoration:underline;">${safePhone}</a>`
                : safePhone
            }
          </td>
        </tr>
      </table>
      <p style="margin:0;color:#666;font-size:13px;line-height:1.5;">
        Les réponses complètes du formulaire${
          uploadedFiles.length ? " et les fichiers joints" : ""
        } sont en pièces jointes (PDF${uploadedFiles.length ? " + images/fichiers" : ""}).
      </p>
    </div>
  </div>
</body>
</html>`

  const transport = getTransporter()
  const attachments = [
    {
      filename: pdfName,
      content: pdfBuffer,
      contentType: "application/pdf",
    },
    ...uploadedFiles.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  ]

  return transport.sendMail({
    from,
    to,
    replyTo: {
      name: subjectFromPerson,
      address: input.email,
    },
    subject: `MEGA - Formulaire de découverte - ${input.serviceTitle} - ${subjectFromPerson}`,
    text,
    html,
    attachments,
  })
}

type CareerEmailInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  offerTitle: string
  answersText: string
  attachments?: QuoteAttachment[]
}

export async function sendCareerEmail(input: CareerEmailInput) {
  const to = getMailTo()
  const from = getMailFrom()

  if (!from) {
    throw new Error("Mail configuration manquante: définis MAIL_FROM ou MAIL_USER/SMTP_USER.")
  }

  assertNoHeaderInjection(input.firstName, "firstName")
  assertNoHeaderInjection(input.lastName, "lastName")
  assertNoHeaderInjection(input.email, "email")
  assertNoHeaderInjection(input.offerTitle, "offerTitle")
  if (input.phone) {
    assertNoHeaderInjection(input.phone, "phone")
  }

  const fullName = [input.firstName, input.lastName]
    .filter((part) => part && part !== "-")
    .join(" ")
  const subjectFromPerson =
    fullName.trim().length > 0 ? fullName.trim() : input.email

  const uploadedFiles = (input.attachments || []).filter(
    (file) => file?.filename && file?.content,
  )

  const text = [
    "Nouvelle candidature reçue via le site MEGA.",
    "",
    `Offre: ${input.offerTitle}`,
    "",
    "Coordonnées:",
    `Nom: ${fullName || "(non renseigné)"}`,
    `Email: ${input.email}`,
    `Telephone: ${input.phone || "(non renseigné)"}`,
    "",
    "Réponses du formulaire:",
    input.answersText,
    "",
    uploadedFiles.length
      ? `Fichiers joints: ${uploadedFiles.map((file) => file.filename).join(", ")}`
      : "Aucun fichier joint.",
  ].join("\n")

  const safeName = escapeHtml(fullName || "(non renseigné)")
  const safeEmail = escapeHtml(input.email)
  const safePhone = escapeHtml(input.phone || "(non renseigné)")
  const safeOffer = escapeHtml(input.offerTitle)
  const phoneHref = input.phone
    ? `tel:${escapeHtml(input.phone.replace(/\s+/g, ""))}`
    : ""
  const answersHtml = escapeHtml(input.answersText).replace(/\n/g, "<br>")

  const html = `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f2f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
    <div style="background:#111;color:#fff;border-radius:18px 18px 0 0;padding:22px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#e44545;font-weight:700;">MEGA · Carrière</p>
      <h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;">Candidature — ${safeOffer}</h1>
    </div>
    <div style="background:#fff;border:1px solid #ece7e4;border-top:0;border-radius:0 0 18px 18px;padding:24px;">
      <p style="margin:0 0 18px;color:#666;font-size:14px;line-height:1.5;">
        Une nouvelle candidature a été soumise depuis le site. Répondre à ce mail contacte directement le candidat.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 18px;background:#faf8f7;border-radius:14px;">
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;width:34%;">Nom</td>
          <td style="padding:14px 16px;color:#111;font-size:14px;font-weight:600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;">Email</td>
          <td style="padding:14px 16px;font-size:14px;font-weight:600;">
            <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:underline;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 16px;color:#888;font-size:13px;">Téléphone</td>
          <td style="padding:14px 16px;font-size:14px;font-weight:600;">
            ${
              phoneHref
                ? `<a href="${phoneHref}" style="color:#2563eb;text-decoration:underline;">${safePhone}</a>`
                : safePhone
            }
          </td>
        </tr>
      </table>
      <div style="margin:0 0 8px;color:#111;font-size:14px;font-weight:700;">Réponses du formulaire</div>
      <div style="padding:16px;background:#faf8f7;border-radius:14px;color:#333;font-size:13px;line-height:1.6;">
        ${answersHtml}
      </div>
      ${
        uploadedFiles.length
          ? `<p style="margin:16px 0 0;color:#666;font-size:13px;">Fichiers joints : ${uploadedFiles
              .map((file) => escapeHtml(file.filename))
              .join(", ")}</p>`
          : ""
      }
    </div>
  </div>
</body>
</html>`

  const transport = getTransporter()
  const mailAttachments = uploadedFiles.map((file) => ({
    filename: file.filename,
    content: Buffer.isBuffer(file.content) ? file.content : Buffer.from(file.content),
    contentType: file.contentType || "application/octet-stream",
  }))

  return transport.sendMail({
    from,
    to,
    replyTo: {
      name: subjectFromPerson,
      address: input.email,
    },
    subject: `MEGA - Candidature - ${input.offerTitle} - ${subjectFromPerson}`,
    text,
    html,
    attachments: mailAttachments,
  })
}
