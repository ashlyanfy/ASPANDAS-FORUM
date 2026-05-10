from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.security import create_access_token, hash_password, verify_password, decode_access_token
from services.users import crud
from services.users.schemas import LoginRequest, RegisterRequest, TokenResponse, UserOut

router = APIRouter()
bearer = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
    db: AsyncSession = Depends(get_db),
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Недействительный токен")
    import uuid
    user = await crud.get_user_by_id(db, uuid.UUID(user_id))
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Пользователь не найден")
    return user


@router.post("/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, db: AsyncSession = Depends(get_db)):
    if await crud.get_user_by_email(db, body.email):
        raise HTTPException(status_code=400, detail="Email уже занят")
    if await crud.get_user_by_username(db, body.username):
        raise HTTPException(status_code=400, detail="Имя пользователя уже занято")
    user = await crud.create_user(db, body.username, body.email, hash_password(body.password))
    return TokenResponse(access_token=create_access_token(str(user.id)))


@router.post("/auth/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await crud.get_user_by_email(db, body.email)
    if not user or not user.password_hash or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Аккаунт заблокирован")
    return TokenResponse(access_token=create_access_token(str(user.id)))


@router.get("/users/me", response_model=UserOut)
async def me(current_user=Depends(get_current_user)):
    return current_user
