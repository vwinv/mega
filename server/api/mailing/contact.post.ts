import { createError, readBody } from "h3"

import { sendContactEmail } from "../../utils/mailer"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isSafeString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const firstName = String(body?.firstName ?? "").trim()
  const lastName = String(body?.lastName ?? "").trim()
  const email = String(body?.email ?? "").trim()
  const phone = String(body?.phone ?? "").trim()
  const subjectLabel = String(body?.subjectLabel ?? "").trim()
  const message = String(body?.message ?? "").trim()
  const subjectKeyRaw = String(body?.subject ?? "").trim()

  const allowedSubjectKeys = [
    "partenariat",
    "avis",
    "rejoindre",
    "general",
  ] as const
  type SubjectKey = (typeof allowedSubjectKeys)[number]
  const subjectKey = allowedSubjectKeys.includes(
    subjectKeyRaw as SubjectKey
  )
    ? (subjectKeyRaw as SubjectKey)
    : null

  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: "Email invalide.",
    })
  }

  if (!subjectKey) {
    throw createError({
      statusCode: 400,
      message: "Sujet invalide.",
    })
  }

  if (!isSafeString(message) || message.length < 5 || message.length > 4000) {
    throw createError({
      statusCode: 400,
      message: "Message invalide (5-4000 caractères).",
    })
  }

  // Limite basique pour réduire le risque d'abus.
  if (firstName.length > 80 || lastName.length > 80 || subjectLabel.length > 120) {
    throw createError({
      statusCode: 400,
      message: "Champs trop longs.",
    })
  }

  try {
    await sendContactEmail({
      firstName,
      lastName,
      email,
      phone: phone.length ? phone : undefined,
      subjectKey,
      subjectLabel,
      message,
    })
  } catch (err: any) {
    // Erreurs nodemailer typiques : EAUTH, ENOTFOUND, EHOSTUNREACH, etc.
    const code = err?.code
    const baseMessage =
      "Echec d'envoi du mail. Vérifie la configuration SMTP (MAIL_HOST/MAIL_USER/MAIL_PASS)."

    if (code === "EAUTH") {
      throw createError({
        statusCode: 500,
        message:
          "Authentification SMTP refusée (vérifie le Google App Password et la 2FA).",
      })
    }

    if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
      throw createError({
        statusCode: 500,
        message: "Hôte SMTP introuvable. Vérifie MAIL_HOST.",
      })
    }

    if (code === "ECONNECTION" || code === "ETIMEDOUT") {
      throw createError({
        statusCode: 500,
        message: "Connexion SMTP impossible (timeout).",
      })
    }

    throw createError({
      statusCode: 500,
      message: baseMessage,
    })
  }

  return { ok: true }
})

