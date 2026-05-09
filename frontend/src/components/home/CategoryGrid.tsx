import { CalendarDays, Camera, CircleHelp, Telescope, Wrench } from "lucide-react";
import type { ForumCategory } from "@/types";

const icons = {
  observations: Telescope,
  astrophoto: Camera,
  equipment: Wrench,
  community: CircleHelp,
  science: CalendarDays,
  "central-asia": Telescope,
};

const accentClass: Record<ForumCategory["accent"], string> = {
  blue: "text-blue-300 bg-blue/10",
  violet: "text-violet-300 bg-violet-500/10",
  gold: "text-yellow-300 bg-yellow-500/10",
  green: "text-green-300 bg-green-500/10",
  rose: "text-rose-300 bg-rose-500/10",
  cyan: "text-cyan-300 bg-cyan-500/10",
};

export function CategoryGrid({ categories }: { categories: ForumCategory[] }) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((category) => {
        const Icon = icons[category.id];

        return (
          <a
            className="glass-panel flex min-h-[104px] items-center gap-4 rounded-[8px] p-5 transition hover:border-border2 hover:bg-surface2"
            href={`/forum/${category.id}`}
            key={category.id}
          >
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[8px] ${accentClass[category.accent]}`}>
              <Icon size={26} />
            </span>
            <span>
              <span className="block font-bold text-bright">{category.title}</span>
              <span className="mt-1 block text-sm text-dim">{category.topicCount} тем</span>
            </span>
          </a>
        );
      })}
    </section>
  );
}
