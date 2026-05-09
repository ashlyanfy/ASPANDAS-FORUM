import { Eye, MessageCircle } from "lucide-react";
import type { ForumCategory, ThreadSummary } from "@/types";
import { formatCount } from "@/lib/utils";

export function ThreadList({
  categories,
  threads,
}: {
  categories: ForumCategory[];
  threads: ThreadSummary[];
}) {
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  return (
    <section className="glass-panel rounded-[8px] p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-bright">Последние темы</h2>
        <a className="text-sm text-violet-300" href="/search">
          Смотреть все →
        </a>
      </div>

      <div className="divide-y divide-border/70">
        {threads.map((thread) => {
          const category = categoryById.get(thread.categoryId);

          return (
            <article className="grid gap-4 py-4 md:grid-cols-[1fr_130px_120px]" key={thread.id}>
              <div className="min-w-0">
                <a className="font-semibold text-bright transition hover:text-violet-200" href={`/thread/${thread.id}`}>
                  {thread.title}
                </a>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-dim">
                  <span>{thread.author.displayName}</span>
                  <span>·</span>
                  <span>{category?.title}</span>
                  {thread.isSolved ? <span className="rounded bg-green-500/10 px-2 py-1 text-green-300">Решено</span> : null}
                </div>
              </div>

              <div className="flex items-center gap-5 text-sm text-dim">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={16} /> {thread.replyCount}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Eye size={16} /> {formatCount(thread.viewCount)}
                </span>
              </div>

              <div className="text-sm text-dim">
                <span className="block text-mid">{thread.lastActivityBy.displayName}</span>
                <span>недавно</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
