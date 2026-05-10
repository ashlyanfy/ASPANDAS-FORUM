import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, field_validator


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

    @field_validator("username")
    @classmethod
    def username_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3 or len(v) > 50:
            raise ValueError("Имя пользователя должно быть от 3 до 50 символов")
        if not v.replace("_", "").replace("-", "").isalnum():
            raise ValueError("Только буквы, цифры, _ и -")
        return v

    @field_validator("password")
    @classmethod
    def password_valid(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Пароль минимум 8 символов")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProfileOut(BaseModel):
    display_name: str | None
    bio: str | None
    avatar_url: str | None
    location: str | None
    telescope: str | None
    camera: str | None

    model_config = {"from_attributes": True}


class UserOut(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    role: str
    is_verified: bool
    created_at: datetime
    profile: ProfileOut | None

    model_config = {"from_attributes": True}
