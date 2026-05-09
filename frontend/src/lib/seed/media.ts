import type { AstroPhoto } from "@/types";
import { users } from "./users";

export const recentPhotos: AstroPhoto[] = [
  {
    id: "orion-nebula",
    title: "Туманность Ориона",
    imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=600&q=80",
    objectName: "M42",
    author: users.nebulaPro,
  },
  {
    id: "andromeda",
    title: "M31 — Андромеда",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
    objectName: "M31",
    author: users.deepSkyHunter,
  },
  {
    id: "moon",
    title: "Луна",
    imageUrl: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=600&q=80",
    objectName: "Moon",
    author: users.starGazer,
  },
];
