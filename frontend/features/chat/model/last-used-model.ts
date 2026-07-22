const LAST_USED_MODEL_STORAGE_KEY = "deeix-chat:chat-last-used-model";

export function readLastUsedModel(): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    return window.localStorage.getItem(LAST_USED_MODEL_STORAGE_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

export function writeLastUsedModel(platformModelName: string): void {
  const normalizedName = platformModelName.trim();
  if (!normalizedName || typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(LAST_USED_MODEL_STORAGE_KEY, normalizedName);
  } catch {
  }
}
