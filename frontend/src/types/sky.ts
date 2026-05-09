export type VisibilityQuality = "poor" | "fair" | "good" | "excellent";

export type SkyObject = {
  id: string;
  name: string;
  objectType: "galaxy" | "nebula" | "planet" | "cluster" | "moon" | "meteor";
  altitudeDeg: number;
  visibility: VisibilityQuality;
  note: string;
};

export type SkyCondition = {
  city: string;
  localTime: string;
  moonSetTime: string;
  seeing: number;
  cloudCover: number;
  bortleClass: number;
};

export type AstroEvent = {
  id: string;
  title: string;
  startsAt: string;
  summary: string;
  tone: "today" | "upcoming" | "warning";
};
