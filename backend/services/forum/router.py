import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.forum import crud
from services.forum.schemas import CategoryOut, PostCreate, PostOut, ThreadCreate, ThreadOut, ThreadSummary
from services.users.router import get_current_user

router = APIRouter()


@router.get("/categories", response_model=list[CategoryOut])
async def list_categories(db: AsyncSession = Depends(get_db)):
    return await crud.get_categories(db)


@router.get("/threads", response_model=list[ThreadSummary])
async def list_threads(
    category_id: int | None = None,
    limit: int = 20,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    threads = await crud.get_threads(db, category_id=category_id, limit=limit, offset=offset)
    result = []
    for t in threads:
        count = await crud.count_posts(db, t.id)
        summary = ThreadSummary.model_validate(t)
        summary.post_count = count
        result.append(summary)
    return result


@router.post("/threads", response_model=ThreadOut, status_code=status.HTTP_201_CREATED)
async def create_thread(
    body: ThreadCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    thread = await crud.create_thread(
        db,
        author_id=current_user.id,
        title=body.title,
        body=body.body,
        category_id=body.category_id,
        type=body.type,
        tags=body.tags,
        location=body.location,
    )
    return ThreadOut.model_validate(thread)


@router.get("/threads/{thread_id}", response_model=ThreadOut)
async def get_thread(thread_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    thread = await crud.get_thread(db, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Тред не найден")
    count = await crud.count_posts(db, thread_id)
    out = ThreadOut.model_validate(thread)
    out.post_count = count
    return out


@router.get("/threads/{thread_id}/posts", response_model=list[PostOut])
async def list_posts(thread_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    thread = await crud.get_thread(db, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Тред не найден")
    return await crud.get_posts(db, thread_id)


@router.post("/threads/{thread_id}/posts", response_model=PostOut, status_code=status.HTTP_201_CREATED)
async def create_post(
    thread_id: uuid.UUID,
    body: PostCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    thread = await crud.get_thread(db, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Тред не найден")
    if thread.is_locked:
        raise HTTPException(status_code=403, detail="Тред закрыт")
    return await crud.create_post(db, thread_id, current_user.id, body.body, body.parent_id)
