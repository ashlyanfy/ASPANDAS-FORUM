import type { UserSummary } from "@/types";

export const users: Record<string, UserSummary> = {
  starGazer: {
    username: "StarGazer",
    displayName: "StarGazer",
    level: "observer",
  },
  lunarExplorer: {
    username: "LunarExplorer",
    displayName: "LunarExplorer",
    level: "expert",
  },
  deepSkyHunter: {
    username: "DeepSkyHunter",
    displayName: "DeepSkyHunter",
    level: "expert",
  },
  astroNomad: {
    username: "AstroNomad",
    displayName: "AstroNomad",
    level: "observer",
  },
  nebulaPro: {
    username: "NebulaPro",
    displayName: "NebulaPro",
    level: "scientist",
  },
};
