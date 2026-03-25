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

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const host = process.env.MAIL_HOST
  const port = Number(process.env.MAIL_PORT ?? 587)
  const secure = process.env.MAIL_SECURE === "true"
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_PASS

  if (!host || !user || !pass) {
    throw new Error(
      "Mail configuration manquante: définis MAIL_HOST, MAIL_USER et MAIL_PASS."
    )
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  return transporter
}

function assertNoHeaderInjection(value: string, fieldName: string) {
  if (value.includes("\n") || value.includes("\r")) {
    throw new Error(`Valeur invalide (${fieldName}): caractères de saut de ligne détectés.`)
  }
}

export async function sendContactEmail(input: ContactEmailInput) {
  const to = process.env.MAIL_TO ?? "contact@mega-sn.com"
  const from = process.env.MAIL_FROM ?? process.env.MAIL_USER

  if (!from) {
    throw new Error("Mail configuration manquante: définis MAIL_FROM ou MAIL_USER.")
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

type QuoteEmailInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  serviceTitle: string
  projectDescription: string
}

export async function sendQuoteEmail(input: QuoteEmailInput) {
  const to = process.env.MAIL_TO ?? "contact@mega-sn.com"
  const from = process.env.MAIL_FROM ?? process.env.MAIL_USER

  if (!from) {
    throw new Error("Mail configuration manquante: définis MAIL_FROM ou MAIL_USER.")
  }

  assertNoHeaderInjection(input.firstName, "firstName")
  assertNoHeaderInjection(input.lastName, "lastName")
  assertNoHeaderInjection(input.email, "email")
  assertNoHeaderInjection(input.serviceTitle, "serviceTitle")
  if (input.phone) {
    assertNoHeaderInjection(input.phone, "phone")
  }

  const fullName = [input.firstName, input.lastName].filter(Boolean).join(" ")
  const subjectFromPerson =
    fullName.trim().length > 0 ? fullName.trim() : input.email

  // Le champ "projectDescription" correspond au corps principal du mail.
  const text = [
    `Service: ${input.serviceTitle}`,
    "",
    input.projectDescription,
    "",
    "Coordonnées:",
    `Nom: ${fullName || "(non renseigné)"}`,
    `Email: ${input.email}`,
    `Telephone: ${input.phone || "(non renseigné)"}`,
  ].join("\n")

  const transport = getTransporter()

  return transport.sendMail({
    from,
    to,
    replyTo: {
      name: subjectFromPerson,
      address: input.email,
    },
    subject: `MEGA - Demande de devis - ${input.serviceTitle} - ${subjectFromPerson}`,
    text,
  })
}

