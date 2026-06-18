import { jsPDF } from "jspdf";
import type { ParsedFiche } from "@/lib/fiche-parser";

export function downloadFichePdf(fiche: ParsedFiche) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - marginX * 2;
  let y = 56;

  const ensureSpace = (lineHeight: number) => {
    if (y + lineHeight > pageHeight - 48) {
      doc.addPage();
      y = 56;
    }
  };

  const writeLines = (text: string, options: { size: number; bold?: boolean; lineHeight?: number; color?: number } = { size: 11 }) => {
    doc.setFont("helvetica", options.bold ? "bold" : "normal");
    doc.setFontSize(options.size);
    doc.setTextColor(options.color ?? 30);
    const lineHeight = options.lineHeight ?? options.size * 1.4;
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, marginX, y);
      y += lineHeight;
    }
  };

  writeLines(fiche.title, { size: 16, bold: true, color: 20 });
  y += 6;

  for (const section of fiche.sections) {
    if (section.kind === "keyValue") {
      for (const [k, v] of section.items) {
        writeLines(`${k} : ${v}`, { size: 11 });
      }
      y += 8;
      continue;
    }

    if (section.kind === "list") {
      writeLines(section.header, { size: 12, bold: true, color: 10 });
      for (const item of section.items) {
        writeLines(`•  ${item}`, { size: 11 });
      }
      y += 8;
      continue;
    }

    writeLines(section.header, { size: 12, bold: true, color: 10 });
    writeLines(section.text, { size: 11 });
    y += 8;
  }

  const filename = `fiche-${fiche.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}.pdf`;
  doc.save(filename || "fiche-pedagogique.pdf");
}
