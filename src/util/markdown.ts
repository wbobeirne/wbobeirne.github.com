import snarkdown from "snarkdown";

export function formatMarkdown(markdown: string) {
  return snarkdown(markdown.trim()).replace(/<br\s*\/?>/g, "<br/><br/>");
}
