#!/usr/bin/env node
/**
 * Envoi groupé d'e-mails avec pièces jointes.
 *
 * Usage:
 *   node scripts/send-bulk-mail.mjs
 *   node scripts/send-bulk-mail.mjs --dry-run
 *
 * Prépare:
 *   1. scripts/bulk-mail/recipients.txt  → une adresse par ligne
 *   2. scripts/bulk-mail/subject.txt     → sujet
 *   3. scripts/bulk-mail/message.txt     → corps du mail (texte)
 *   4. scripts/bulk-mail/attachments/    → fichiers à joindre
 *
 * Variables d'environnement (.env à la racine du projet):
 *   MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS, MAIL_FROM
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dns from 'node:dns/promises'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const mailDir = path.join(__dirname, 'bulk-mail')
const attachmentsDir = path.join(mailDir, 'attachments')
const sentLogPath = path.join(mailDir, 'sent.log')
const dryRun = process.argv.includes('--dry-run')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const text = fs.readFileSync(filePath, 'utf8')
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier manquant: ${filePath}`)
  }
  return fs.readFileSync(filePath, 'utf8').trim()
}

function readRecipients(filePath) {
  return readText(filePath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
}

function loadSentLog(filePath) {
  if (!fs.existsSync(filePath)) return new Set()
  return new Set(
    fs
      .readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line && !line.startsWith('#')),
  )
}

function markSent(filePath, email) {
  fs.appendFileSync(filePath, `${email}\n`, 'utf8')
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function domainHasMx(domain, cache) {
  if (cache.has(domain)) return cache.get(domain)
  try {
    const records = await dns.resolveMx(domain)
    const ok = Array.isArray(records) && records.length > 0
    cache.set(domain, ok)
    return ok
  } catch {
    cache.set(domain, false)
    return false
  }
}

async function filterDeliverableEmails(emails) {
  const cache = new Map()
  const valid = []
  const skipped = []

  for (const email of emails) {
    const domain = email.split('@')[1]?.toLowerCase()
    if (!domain) {
      skipped.push({ email, reason: 'domaine invalide' })
      continue
    }
    const ok = await domainHasMx(domain, cache)
    if (!ok) {
      skipped.push({ email, reason: `pas de serveur mail (MX) pour ${domain}` })
      continue
    }
    valid.push(email)
  }

  return { valid, skipped }
}

function listAttachments(dirPath) {
  if (!fs.existsSync(dirPath)) return []
  return fs
    .readdirSync(dirPath)
    .filter((name) => !name.startsWith('.'))
    .map((name) => {
      const filePath = path.join(dirPath, name)
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) return null
      return {
        filename: name,
        path: filePath,
        size: stat.size,
      }
    })
    .filter(Boolean)
}

function formatBytes(size) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

loadEnvFile(path.join(root, '.env'))
loadEnvFile(path.join(root, '.env.local'))

const host = process.env.MAIL_HOST || process.env.SMTP_HOST
const port = Number(process.env.MAIL_PORT || process.env.SMTP_PORT || 587)
const secure = (process.env.MAIL_SECURE || process.env.SMTP_SECURE) === 'true'
const user = process.env.MAIL_USER || process.env.SMTP_USER
const pass = process.env.MAIL_PASS || process.env.SMTP_PASSWORD || process.env.SMTP_PASS
const fromRaw = process.env.MAIL_FROM || process.env.SMTP_FROM || user
const from =
  fromRaw && fromRaw.includes('@')
    ? fromRaw
    : user
      ? `"${fromRaw || 'MEGA'}" <${user}>`
      : fromRaw

const recipientsRaw = readRecipients(path.join(mailDir, 'recipients.txt'))
const subject = readText(path.join(mailDir, 'subject.txt'))
const text = readText(path.join(mailDir, 'message.txt'))
const attachments = listAttachments(attachmentsDir)
const alreadySent = loadSentLog(sentLogPath)

const invalid = recipientsRaw.filter((email) => !isEmail(email))
if (invalid.length) {
  console.error('Adresses invalides:')
  for (const email of invalid) console.error(`  - ${email}`)
  process.exit(1)
}

if (!recipientsRaw.length) {
  console.error('Aucun destinataire dans scripts/bulk-mail/recipients.txt')
  process.exit(1)
}

const withoutSent = recipientsRaw.filter(
  (email) => !alreadySent.has(email.toLowerCase()),
)
const skippedSent = recipientsRaw.length - withoutSent.length
if (skippedSent) {
  console.log(`Déjà envoyés (ignorés via sent.log): ${skippedSent}`)
}

console.log('Vérification des domaines mail (MX)...')
const { valid: recipients, skipped } = await filterDeliverableEmails(
  withoutSent.filter((email) => isEmail(email)),
)
if (skipped.length) {
  console.log(`Domaines sans MX / non livrables: ${skipped.length}`)
  for (const item of skipped) console.log(`  - ${item.email} (${item.reason})`)
}
if (!recipients.length) {
  console.error('Aucun destinataire livrable après filtrage.')
  process.exit(1)
}
console.log(`Destinataires retenus: ${recipients.length}/${recipientsRaw.length}\n`)

if (!subject) {
  console.error('Sujet vide: scripts/bulk-mail/subject.txt')
  process.exit(1)
}

if (!text) {
  console.error('Message vide: scripts/bulk-mail/message.txt')
  process.exit(1)
}

if (!host || !user || !pass || !from) {
  console.error('Config SMTP manquante. Ajoute dans .env:')
  console.error('  MAIL_HOST=...')
  console.error('  MAIL_PORT=587')
  console.error('  MAIL_SECURE=false')
  console.error('  MAIL_USER=...')
  console.error('  MAIL_PASS=...')
  console.error('  MAIL_FROM=...')
  process.exit(1)
}

console.log('--- Envoi groupé MEGA ---')
console.log(`Mode      : ${dryRun ? 'DRY-RUN (aucun envoi)' : 'ENVOI RÉEL'}`)
console.log(`De        : ${from}`)
console.log(`SMTP      : ${host}:${port} (secure=${secure})`)
console.log(`Sujet     : ${subject}`)
console.log(`Dest.     : ${recipients.length}`)
console.log(`Pièces    : ${attachments.length}`)
for (const file of attachments) {
  console.log(`  - ${file.filename} (${formatBytes(file.size)})`)
}
console.log('')

if (dryRun) {
  console.log('Destinataires:')
  for (const email of recipients) console.log(`  - ${email}`)
  console.log('\nDry-run terminé. Relance sans --dry-run pour envoyer.')
  process.exit(0)
}

function createTransporter() {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 60_000,
    greetingTimeout: 60_000,
    socketTimeout: 10 * 60_000,
  })
}

let transporter = createTransporter()
await transporter.verify()
console.log('SMTP OK\n')

const attachmentPayload = attachments.map((file) => ({
  filename: file.filename,
  content: fs.readFileSync(file.path),
}))

let ok = 0
let fail = 0
const failed = []
const total = recipients.length

async function sendOne(email) {
  return transporter.sendMail({
    from,
    to: email,
    subject,
    text,
    attachments: attachmentPayload,
  })
}

for (let i = 0; i < recipients.length; i += 1) {
  const email = recipients[i]
  const label = `[${i + 1}/${total}]`
  let sent = false

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const info = await sendOne(email)
      ok += 1
      sent = true
      markSent(sentLogPath, email)
      alreadySent.add(email.toLowerCase())
      console.log(`✓ ${label} ${email}  (${info.messageId || 'envoyé'})`)
      break
    } catch (error) {
      const message = error?.message || String(error)
      console.error(`! ${label} tentative ${attempt}/2 ${email}  ${message}`)
      try {
        transporter.close()
      } catch {
        // ignore
      }
      transporter = createTransporter()
      await new Promise((resolve) => setTimeout(resolve, 3000))
      if (attempt === 2) {
        fail += 1
        failed.push(email)
        console.error(`✗ ${label} ${email}  abandonné`)
      }
    }
  }

  if (!sent && i < recipients.length - 1) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  } else if (sent && i < recipients.length - 1) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

console.log(`\nTerminé: ${ok} ok, ${fail} échec(s).`)
if (failed.length) {
  console.log('Échecs:')
  for (const email of failed) console.log(`  - ${email}`)
}
process.exit(fail ? 1 : 0)
