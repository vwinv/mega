import { createError, readBody } from "h3"

import { sendQuoteEmail } from "../../utils/mailer"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const firstName = String(body?.firstName ?? "").trim()
  const lastName = String(body?.lastName ?? "").trim()
  const email = String(body?.email ?? "").trim()
  const phone = String(body?.phone ?? "").trim()
  const serviceTitle = String(body?.serviceTitle ?? "").trim()
  const projectDescription = String(
    body?.projectDescription ?? ""
  ).trim()

  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: "Email invalide.",
    })
  }

  if (!isNonEmptyString(firstName) || firstName.length > 80) {
    throw createError({
      statusCode: 400,
      message: "Prénom invalide.",
    })
  }

  if (!isNonEmptyString(lastName) || lastName.length > 80) {
    throw createError({
      statusCode: 400,
      message: "Nom invalide.",
    })
  }

  if (!isNonEmptyString(serviceTitle) || serviceTitle.length > 120) {
    throw createError({
      statusCode: 400,
      message: "Service invalide.",
    })
  }

  if (phone.length && phone.length > 40) {
    throw createError({
      statusCode: 400,
      message: "Numéro de téléphone invalide.",
    })
  }

  if (
    !isNonEmptyString(projectDescription) ||
    projectDescription.length < 5 ||
    projectDescription.length > 4000
  ) {
    throw createError({
      statusCode: 400,
      message: "Description du projet invalide (5-4000 caractères).",
    })
  }

  try {
    await sendQuoteEmail({
      firstName,
      lastName,
      email,
      phone: phone.length ? phone : undefined,
      serviceTitle,
      projectDescription,
    })
  } catch (err: any) {
    const code = err?.code

    if (code === "EAUTH") {
      throw createError({
        statusCode: 500,
        message:
          "Authentification SMTP refusée (vérifie le Google App Password et la 2FA).",
      })
    }

    throw createError({
      statusCode: 500,
      message:
        "Echec d'envoi du mail. Vérifie la configuration SMTP (MAIL_HOST/MAIL_USER/MAIL_PASS).",
    })
  }

  return { ok: true }
})

