export type UserLevel = "beginner" | "observer" | "expert" | "scientist";

export type UserSummary = {
  username: string;
  displayName: string;
  avatarUrl?: string;
  level: UserLevel;
};
