import type { AstroEvent, SkyCondition, SkyObject } from "@/types";

export const tonightCondition: SkyCondition = {
  city: "Алматы",
  localTime: "20:28",
  moonSetTime: "02:14",
  seeing: 4,
  cloudCover: 12,
  bortleClass: 4,
};

export const tonightObjects: SkyObject[] = [
  {
    id: "m13",
    name: "M13",
    objectType: "cluster",
    altitudeDeg: 74,
    visibility: "excellent",
    note: "Высоко после полуночи",
  },
  {
    id: "m57",
    name: "M57",
    objectType: "nebula",
    altitudeDeg: 68,
    visibility: "good",
    note: "Лучше видна при темной адаптации",
  },
  {
    id: "m3",
    name: "M3",
    objectType: "cluster",
    altitudeDeg: 61,
    visibility: "good",
    note: "Хороший объект для малых апертур",
  },
  {
    id: "mars",
    name: "Марс",
    objectType: "planet",
    altitudeDeg: 29,
    visibility: "fair",
    note: "Низко, нужна спокойная атмосфера",
  },
];

export const astroEvents: AstroEvent[] = [
  {
    id: "lyrids-peak",
    title: "Лириды — пик активности",
    startsAt: "2026-05-09T23:00:00+05:00",
    summary: "До 18 метеоров в час, радиант в Лире. Луна заходит в 02:14, условия хорошие.",
    tone: "today",
  },
  {
    id: "mars-opposition",
    title: "Марс — противостояние",
    startsAt: "2026-05-26T22:00:00+05:00",
    summary: "Диск 17.9 секунд, яркость -1.8m. Лучшая видимость планеты за год.",
    tone: "upcoming",
  },
  {
    id: "lunar-eclipse",
    title: "Лунное затмение",
    startsAt: "2026-06-13T20:30:00+05:00",
    summary: "Полутеневое, видно из Центральной Азии. Фаза 0.98, около 4 часов.",
    tone: "warning",
  },
];
