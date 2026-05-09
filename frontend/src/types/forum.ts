import type { UserSummary } from "./user";

export type ForumCategoryId =
  | "observations"
  | "astrophoto"
  | "equipment"
  | "science"
  | "community"
  | "central-asia";

export type ForumCategory = {
  id: ForumCategoryId;
  title: string;
  description: string;
  topicCount: number;
  accent: "blue" | "violet" | "gold" | "green" | "rose" | "cyan";
};

export type ThreadType = "question" | "report" | "review" | "discussion";

export type ThreadSummary = {
  id: string;
  title: string;
  categoryId: ForumCategoryId;
  type: ThreadType;
  author: UserSummary;
  lastActivityBy: UserSummary;
  replyCount: number;
  viewCount: number;
  createdAt: string;
  lastActivityAt: string;
  isSolved?: boolean;
  isPinned?: boolean;
};
