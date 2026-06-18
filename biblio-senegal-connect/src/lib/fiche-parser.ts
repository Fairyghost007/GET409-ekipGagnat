export type FicheSection =
  | { kind: "keyValue"; items: Array<[string, string]> }
  | { kind: "list"; header: string; items: string[] }
  | { kind: "paragraph"; header: string; text: string };

export type ParsedFiche = {
  title: string;
  sections: FicheSection[];
};

export function parseFiche(text: string): ParsedFiche | null {
  const blocks = text
    .split(/─{3,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (blocks.length < 2) return null;

  const [title, ...rest] = blocks;

  const sections: FicheSection[] = rest.map((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const isKeyValueBlock = lines.every((l) => / : /.test(l));

    if (isKeyValueBlock) {
      return {
        kind: "keyValue",
        items: lines.map((l) => {
          const [k, ...valueParts] = l.split(" : ");
          return [k, valueParts.join(" : ")] as [string, string];
        }),
      };
    }

    const [header, ...contentLines] = lines;
    const isList = contentLines.length > 0 && contentLines.every((l) => l.startsWith("-"));

    if (isList) {
      return {
        kind: "list",
        header,
        items: contentLines.map((l) => l.replace(/^-\s*/, "")),
      };
    }

    return { kind: "paragraph", header, text: contentLines.join(" ") };
  });

  return { title, sections };
}
