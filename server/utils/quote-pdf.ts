import PDFDocument from "pdfkit"

export type QuotePdfImage = {
  filename: string
  content: Buffer
  contentType?: string
}

type QuotePdfInput = {
  serviceTitle: string
  fullName: string
  email: string
  phone?: string
  projectDescription: string
  images?: QuotePdfImage[]
}

function parseDescription(description: string) {
  const blocks = description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return blocks.map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
    if (lines[0]?.startsWith("## ")) {
      return {
        title: lines[0].slice(3).trim(),
        rows: lines.slice(1).map((line) => {
          const sep = line.indexOf(": ")
          if (sep === -1) return { label: "", value: line }
          return {
            label: line.slice(0, sep),
            value: line.slice(sep + 2),
          }
        }),
      }
    }
    return {
      title: "",
      rows: [{ label: "", value: block }],
    }
  })
}

function isEmbeddableImage(file: QuotePdfImage) {
  const name = file.filename.toLowerCase()
  const type = String(file.contentType || "").toLowerCase()
  return (
    type.includes("jpeg") ||
    type.includes("jpg") ||
    type.includes("png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png")
  )
}

export async function buildQuoteAnswersPdf(input: QuotePdfInput): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margin: 44,
    info: {
      Title: `Formulaire de découverte — ${input.serviceTitle}`,
      Author: "MEGA",
      Subject: "Réponses du formulaire de découverte",
    },
  })

  const chunks: Buffer[] = []
  doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)))

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)
  })

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const pageBottom = doc.page.height - doc.page.margins.bottom

  doc
    .fillColor("#e44545")
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("MEGA · FORMULAIRE", { characterSpacing: 1.4 })

  doc.moveDown(0.4)
  doc
    .fillColor("#111111")
    .fontSize(26)
    .font("Helvetica-Bold")
    .text(`Formulaire de découverte — ${input.serviceTitle}`, {
      width: pageWidth,
      lineGap: 2,
    })

  doc.moveDown(0.45)
  doc
    .fillColor("#666666")
    .fontSize(13)
    .font("Helvetica")
    .text("Réponses complètes du client, avec les fichiers joints le cas échéant.", {
      width: pageWidth,
      lineGap: 2,
    })

  doc.moveDown(0.9)
  const contactBoxHeight = 108
  doc
    .roundedRect(doc.x, doc.y, pageWidth, contactBoxHeight, 12)
    .fill("#f7f5f4")

  const boxTop = doc.y + 16
  const labelX = doc.page.margins.left + 16
  const valueX = doc.page.margins.left + 140
  const contactRows = [
    ["Nom", input.fullName || "(non renseigné)"],
    ["Email", input.email],
    ["Téléphone", input.phone || "(non renseigné)"],
  ] as const

  contactRows.forEach(([label, value], index) => {
    const y = boxTop + index * 28
    doc
      .fillColor("#888888")
      .fontSize(13)
      .font("Helvetica")
      .text(label, labelX, y, { width: 110, lineBreak: false })
    doc
      .fillColor("#111111")
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(value, valueX, y, { width: pageWidth - 160, lineBreak: false })
  })

  doc.y = boxTop + contactBoxHeight - 8
  doc.x = doc.page.margins.left
  doc.moveDown(1.1)

  const sections = parseDescription(input.projectDescription)
  for (const section of sections) {
    if (doc.y > pageBottom - 120) doc.addPage()

    if (section.title) {
      doc
        .fillColor("#e44545")
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(section.title.toUpperCase(), { characterSpacing: 0.7 })
      doc.moveDown(0.45)
    }

    for (const row of section.rows) {
      if (doc.y > pageBottom - 90) doc.addPage()

      if (row.label) {
        doc
          .fillColor("#888888")
          .fontSize(12)
          .font("Helvetica")
          .text(row.label, { width: pageWidth, lineGap: 1 })
        doc.moveDown(0.18)
        doc
          .fillColor("#111111")
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(row.value || "—", { width: pageWidth, lineGap: 2 })
      } else {
        doc
          .fillColor("#333333")
          .fontSize(13)
          .font("Helvetica")
          .text(row.value, { width: pageWidth, lineGap: 2 })
      }
      doc.moveDown(0.7)
    }

    doc.moveDown(0.45)
  }

  const files = (input.images || []).filter((file) => file?.filename && file?.content?.length)
  if (files.length) {
    if (doc.y > pageBottom - 140) doc.addPage()

    doc
      .fillColor("#e44545")
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FICHIERS JOINTS", { characterSpacing: 0.7 })
    doc.moveDown(0.55)

    for (const file of files) {
      if (doc.y > pageBottom - 100) doc.addPage()

      doc
        .fillColor("#888888")
        .fontSize(12)
        .font("Helvetica")
        .text(file.filename, { width: pageWidth })
      doc.moveDown(0.3)

      if (isEmbeddableImage(file)) {
        try {
          const maxHeight = Math.min(280, pageBottom - doc.y - 28)
          if (maxHeight < 90) {
            doc.addPage()
          }
          doc.image(file.content, {
            fit: [pageWidth, Math.min(280, pageBottom - doc.y - 28)],
            align: "left",
            valign: "top",
          })
          doc.moveDown(0.9)
        } catch {
          doc
            .fillColor("#111111")
            .fontSize(13)
            .font("Helvetica")
            .text("(Image jointe au mail — aperçu indisponible dans le PDF)")
          doc.moveDown(0.65)
        }
      } else {
        doc
          .fillColor("#111111")
          .fontSize(13)
          .font("Helvetica")
          .text("Fichier joint au mail (aperçu non intégré au PDF).")
        doc.moveDown(0.65)
      }
    }
  }

  doc.end()
  return done
}
