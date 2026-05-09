import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Hero } from "@/components/home/Hero";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { Sidebar } from "@/components/home/Sidebar";
import { SkyPlannerCard } from "@/components/home/SkyPlannerCard";
import { ThreadList } from "@/components/home/ThreadList";
import { forumCategories, recentThreads } from "@/lib/seed/forum";
import { recentPhotos } from "@/lib/seed/media";
import { astroEvents, tonightObjects } from "@/lib/seed/sky";

export default function HomePage() {
  return (
    <main className="page-grid py-6 md:py-8">
      <Hero />
      <CategoryGrid categories={forumCategories} />
      <SkyPlannerCard />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <ThreadList categories={forumCategories} threads={recentThreads} />
          <PhotoStrip photos={recentPhotos} />
        </div>
        <Sidebar activeThreads={recentThreads} events={astroEvents} skyObjects={tonightObjects} />
      </div>
    </main>
  );
}
