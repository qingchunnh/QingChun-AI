import {
  conversationMatchesSearch,
  normalizeConversationSearchText,
} from "@/shared/lib/conversation-search";
import type { ConversationSearchResult } from "@/features/layouts/types/navigation";
import type { ConversationDTO, ConversationSearchResultDTO } from "@/shared/api/conversation.types";

type ConversationSearchResultGroup = {
  key: string;
  label: string;
  items: ConversationSearchResult[];
};

export function toConversationSearchResult(
  item: ConversationSearchResultDTO,
  untitled: string,
): ConversationSearchResult {
  const title = item.title?.trim() || untitled;
  return {
    publicID: item.publicID,
    title,
    href: `/chat?conversation_id=${item.publicID}`,
    projectName: item.projectName,
    status: item.status,
    updatedAt: item.updatedAt,
  };
}

export function filterConversationSearchResults(
  items: readonly ConversationDTO[],
  query: string,
  { untitled }: { untitled: string },
): ConversationSearchResult[] {
  const normalizedQuery = normalizeConversationSearchText(query);
  return items
    .filter((item) => conversationMatchesSearch(item, normalizedQuery))
    .map((item) => {
      const title = item.title?.trim() || untitled;
      return {
        publicID: item.publicID,
        title,
        href: `/chat?conversation_id=${item.publicID}`,
        projectName: item.projectName,
        status: item.status,
        updatedAt: item.updatedAt,
      };
    });
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatMonthKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function groupConversationSearchResultsByDate(
  items: readonly ConversationSearchResult[],
  {
    todayLabel,
    yesterdayLabel,
    lastSevenDaysLabel,
    lastThirtyDaysLabel,
  }: {
    todayLabel: string;
    yesterdayLabel: string;
    lastSevenDaysLabel: string;
    lastThirtyDaysLabel: string;
  },
): ConversationSearchResultGroup[] {
  const now = new Date();
  const todayStart = startOfDay(now);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const sevenDaysAgo = new Date(todayStart);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date(todayStart);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const groups = new Map<
    string,
    ConversationSearchResultGroup & {
      order: number;
    }
  >();

  for (const item of items) {
    const updatedAt = new Date(item.updatedAt);
    if (Number.isNaN(updatedAt.getTime())) {
      continue;
    }

    let key: string;
    let label: string;
    let order: number;

    if (updatedAt >= todayStart) {
      key = "today";
      label = todayLabel;
      order = Number.MAX_SAFE_INTEGER;
    } else if (updatedAt >= yesterdayStart) {
      key = "yesterday";
      label = yesterdayLabel;
      order = Number.MAX_SAFE_INTEGER - 1;
    } else if (updatedAt >= sevenDaysAgo) {
      key = "last7days";
      label = lastSevenDaysLabel;
      order = Number.MAX_SAFE_INTEGER - 2;
    } else if (updatedAt >= thirtyDaysAgo) {
      key = "last30days";
      label = lastThirtyDaysLabel;
      order = Number.MAX_SAFE_INTEGER - 3;
    } else {
      key = formatMonthKey(updatedAt);
      label = key;
      order = updatedAt.getFullYear() * 12 + updatedAt.getMonth();
    }

    const group = groups.get(key);

    if (group) {
      group.items.push(item);
    } else {
      groups.set(key, { key, label, items: [item], order });
    }
  }

  return Array.from(groups.values())
    .sort((left, right) => right.order - left.order)
    .map(({ key, label, items: groupItems }) => ({
      key,
      label,
      items: groupItems,
    }));
}

type UpdatedAtLabelValues = {
  year: number;
  month: number;
  day: number;
  time: string;
};

type UpdatedAtLabelFormatter = (
  key: "todayTime" | "thisYearDateTime" | "fullDateTime",
  values: UpdatedAtLabelValues,
) => string;

export function formatUpdatedAtLabel(value: string, formatLabel: UpdatedAtLabelFormatter) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const timeLabel = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
  const values = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    time: timeLabel,
  };

  if (isToday) {
    return formatLabel("todayTime", values);
  }

  return formatLabel(isCurrentYear ? "thisYearDateTime" : "fullDateTime", values);
}
