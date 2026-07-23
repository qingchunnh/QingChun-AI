export const PROMPT_PRESET_LIMITS = {
  name: 64,
  description: 256,
  content: 50000,
} as const;

export function normalizePromptPresetName(value: string): string {
  return value
    .trim()
    .replace(/^\/+/, "")
    .trim();
}
