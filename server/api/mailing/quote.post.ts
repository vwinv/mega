import { createError, getHeader, readBody, readMultipartFormData } from "h3"

import { sendQuoteEmail, type QuoteAttachment } from "../../utils/mailer"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FILES = 8
const MAX_FILE_BYTES = 8 * 1024 * 1024

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

function isAllowedFile(filename: string, type: string) {
  const lower = filename.toLowerCase()
  const byExt =
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".svg") ||
    lower.endsWith(".pdf")
  const byType =
    type.startsWith("image/") ||
    type === "application/pdf" ||
    type === "application/octet-stream" ||
    type === ""
  return byExt && byType
}

export default defineEventHandler(async (event) => {
  const contentType = String(getHeader(event, "content-type") || "")
  let firstName = ""
  let lastName = ""
  let email = ""
  let phone = ""
  let serviceTitle = ""
  let projectDescription = ""
  const attachments: QuoteAttachment[] = []

  if (contentType.includes("multipart/form-data")) {
    const parts = await readMultipartFormData(event)
    for (const part of parts || []) {
      const name = String(part.name || "")
      if (part.filename) {
        if (attachments.length >= MAX_FILES) continue
        const filename = String(part.filename)
        const type = String(part.type || "")
        const content = Buffer.from(part.data || [])
        if (!content.length) continue
        if (content.length > MAX_FILE_BYTES) {
          throw createError({
            statusCode: 400,
            message: `Fichier trop volumineux (max ${MAX_FILE_BYTES / (1024 * 1024)} Mo) : ${filename}`,
          })
        }
        if (!isAllowedFile(filename, type)) {
          throw createError({
            statusCode: 400,
            message: `Type de fichier non autorisé : ${filename}`,
          })
        }
        attachments.push({
          filename,
          content,
          contentType: type || undefined,
        })
        continue
      }

      const value = Buffer.from(part.data || []).toString("utf8").trim()
      if (name === "firstName") firstName = value
      else if (name === "lastName") lastName = value
      else if (name === "email") email = value
      else if (name === "phone") phone = value
      else if (name === "serviceTitle") serviceTitle = value
      else if (name === "projectDescription") projectDescription = value
    }
  } else {
    const body = await readBody(event)
    firstName = String(body?.firstName ?? "").trim()
    lastName = String(body?.lastName ?? "").trim()
    email = String(body?.email ?? "").trim()
    phone = String(body?.phone ?? "").trim()
    serviceTitle = String(body?.serviceTitle ?? "").trim()
    projectDescription = String(body?.projectDescription ?? "").trim()
  }

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
    projectDescription.length > 20000
  ) {
    throw createError({
      statusCode: 400,
      message: "Description du projet invalide (5-20000 caractères).",
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
      attachments,
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
