import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from services.forum.models import Category, Post, Thread


async def get_categories(db: AsyncSession) -> list[Category]:
    result = await db.execute(select(Category).order_by(Category.sort_order))
    return list(result.scalars().all())


async def get_threads(
    db: AsyncSession,
    category_id: int | None = None,
    limit: int = 20,
    offset: int = 0,
) -> list[Thread]:
    q = select(Thread).options(selectinload(Thread.category)).order_by(Thread.created_at.desc())
    if category_id:
        q = q.where(Thread.category_id == category_id)
    q = q.limit(limit).offset(offset)
    result = await db.execute(q)
    return list(result.scalars().all())


async def get_thread(db: AsyncSession, thread_id: uuid.UUID) -> Thread | None:
    result = await db.execute(
        select(Thread)
        .where(Thread.id == thread_id)
        .options(selectinload(Thread.category))
    )
    return result.scalar_one_or_none()


async def create_thread(
    db: AsyncSession,
    author_id: uuid.UUID,
    title: str,
    body: str,
    category_id: int,
    type: str,
    tags: list[str] | None,
    location: str | None,
) -> Thread:
    thread = Thread(
        title=title,
        body=body,
        author_id=author_id,
        category_id=category_id,
        type=type,
        tags=tags,
        location=location,
    )
    db.add(thread)
    await db.commit()
    await db.refresh(thread)
    return thread


async def get_posts(db: AsyncSession, thread_id: uuid.UUID) -> list[Post]:
    result = await db.execute(
        select(Post).where(Post.thread_id == thread_id).order_by(Post.created_at)
    )
    return list(result.scalars().all())


async def create_post(
    db: AsyncSession,
    thread_id: uuid.UUID,
    author_id: uuid.UUID,
    body: str,
    parent_id: uuid.UUID | None,
) -> Post:
    post = Post(thread_id=thread_id, author_id=author_id, body=body, parent_id=parent_id)
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


async def count_posts(db: AsyncSession, thread_id: uuid.UUID) -> int:
    result = await db.execute(select(func.count()).where(Post.thread_id == thread_id))
    return result.scalar_one()
