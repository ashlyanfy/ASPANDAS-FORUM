import type { UserSummary } from "./user";

export type AstroPhoto = {
  id: string;
  title: string;
  imageUrl: string;
  objectName: string;
  author: UserSummary;
};
