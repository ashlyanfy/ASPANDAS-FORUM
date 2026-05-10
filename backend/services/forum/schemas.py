import uuid
from datetime import datetime

from pydantic import BaseModel, field_validator


class CategoryOut(BaseModel):
    id: int
    slug: str
    name: str
    description: str | None
    color: str | None
    icon: str | None

    model_config = {"from_attributes": True}


class ThreadCreate(BaseModel):
    title: str
    body: str
    category_id: int
    type: str = "discussion"
    tags: list[str] | None = None
    location: str | None = None

    @field_validator("title")
    @classmethod
    def title_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 5:
            raise ValueError("Заголовок минимум 5 символов")
        return v

    @field_validator("body")
    @classmethod
    def body_valid(cls, v: str) -> str:
        if len(v.strip()) < 10:
            raise ValueError("Текст минимум 10 символов")
        return v


class AuthorOut(BaseModel):
    id: uuid.UUID
    username: str

    model_config = {"from_attributes": True}


class ThreadOut(BaseModel):
    id: uuid.UUID
    title: str
    body: str
    type: str
    is_pinned: bool
    is_locked: bool
    is_solved: bool
    views: int
    tags: list[str] | None
    location: str | None
    created_at: datetime
    category: CategoryOut
    author_id: uuid.UUID
    post_count: int = 0

    model_config = {"from_attributes": True}


class ThreadSummary(BaseModel):
    id: uuid.UUID
    title: str
    type: str
    is_solved: bool
    views: int
    tags: list[str] | None
    created_at: datetime
    category: CategoryOut
    author_id: uuid.UUID
    post_count: int = 0

    model_config = {"from_attributes": True}


class PostCreate(BaseModel):
    body: str
    parent_id: uuid.UUID | None = None

    @field_validator("body")
    @classmethod
    def body_valid(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Ответ не может быть пустым")
        return v


class PostOut(BaseModel):
    id: uuid.UUID
    thread_id: uuid.UUID
    author_id: uuid.UUID
    parent_id: uuid.UUID | None
    body: str
    is_solution: bool
    created_at: datetime

    model_config = {"from_attributes": True}
