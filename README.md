# 🌙 Аспандас — Астрофорум

> **Aspandas** (каз. «небо») — профессиональный форум для астрономов-любителей и астрофизиков.  
> Первая платформа в СНГ с встроенным планировщиком наблюдений, картой тёмных мест и AI-ассистентом.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## О проекте

Аспандас решает проблему которую не решает ни один существующий форум — русскоязычное астрономическое сообщество без нормальной платформы. Cloudy Nights и Stargazers Lounge — на английском. Reddit — без инструментов наблюдателя. Ни у кого нет карты тёмных мест для Казахстана и ЦА.

**Что делает Aspandas уникальным:**
- Форум на русском и казахском языке
- Встроенный Sky Planner — планировщик наблюдений с картой неба
- Карта тёмных мест Казахстана и ЦА по шкале Бортля от сообщества
- Автоматический plate solving при загрузке астрофото
- AI-ассистент для вопросов по астрономии
- Уведомления о затмениях, метеорных потоках, противостояниях планет
- Дневник наблюдений с геопривязкой

---

## Стек технологий

### Фронтенд
| Технология | Назначение |
|---|---|
| Next.js 14 (App Router) | Основной фреймворк |
| TypeScript | Типизация |
| Tailwind CSS | Стили |
| shadcn/ui | UI компоненты |
| Zustand | Управление состоянием |
| TanStack Query | Data fetching и кэш |
| TipTap | Rich-text редактор с LaTeX |

### Бэкенд
| Технология | Назначение |
|---|---|
| FastAPI (Python 3.11+) | API |
| SQLAlchemy 2.0 | ORM |
| Alembic | Миграции БД |
| Celery + Redis | Фоновые задачи |
| WebSockets | Real-time уведомления |

### Базы данных и хранилище
| Технология | Назначение |
|---|---|
| PostgreSQL 16 | Основная БД |
| PostGIS | Геоданные (карта мест) |
| Redis | Кэш и очереди |
| S3 / MinIO | Медиафайлы |

### Деплой
| Сервис | Назначение |
|---|---|
| Vercel | Фронтенд |
| Railway | Бэкенд и БД |
| Cloudflare | CDN и защита |

---

## Структура репозитория

```
aspan/
├── frontend/               # Next.js 14
│   ├── src/
│   │   ├── app/            # App Router страницы
│   │   ├── components/     # UI компоненты
│   │   ├── lib/            # Утилиты и API клиент
│   │   ├── hooks/          # Кастомные хуки
│   │   └── store/          # Zustand stores
│   └── Dockerfile
│
├── backend/                # FastAPI
│   ├── services/
│   │   ├── forum/          # Треды, посты, комментарии
│   │   ├── users/          # Авторизация, профили
│   │   ├── sky/            # Планировщик, эфемериды
│   │   ├── media/          # Загрузка фото, plate solving
│   │   ├── ai/             # Claude API, embeddings
│   │   ├── events/         # Астрособытия, погода
│   │   ├── darksky/        # Карта тёмных мест
│   │   └── notify/         # WebSocket, email, push
│   ├── core/               # Конфигурация, БД, безопасность
│   ├── workers/            # Celery задачи
│   ├── migrations/         # Alembic
│   └── Dockerfile
│
├── mobile/                 # React Native + Expo (v2.0)
├── infra/                  # Nginx, Prometheus, Grafana
├── .github/workflows/      # CI/CD
├── docker-compose.yml      # Локальная разработка
└── Makefile
```

---

## Быстрый старт

### Требования
- Node.js 18+
- Python 3.11+
- Docker и Docker Compose
- PostgreSQL 16

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/aspan.git
cd aspan

# Скопировать переменные окружения
cp .env.example .env

# Запустить через Docker Compose
docker-compose up -d

# Или запустить вручную:

# Фронтенд
cd frontend
npm install
npm run dev

# Бэкенд
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload
```

Открыть в браузере: [http://localhost:3000](http://localhost:3000)  
API документация: [http://localhost:8000/docs](http://localhost:8000/docs)

### Переменные окружения

```env
# База данных
DATABASE_URL=postgresql://user:password@localhost:5432/aspan

# Авторизация
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# AI
ANTHROPIC_API_KEY=

# Внешние API
OPENWEATHERMAP_API_KEY=
NASA_API_KEY=

# Хранилище
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Redis
REDIS_URL=redis://localhost:6379
```

---

## Roadmap

### MVP — 2–3 месяца
- [x] Дизайн и мокапы главной страницы
- [ ] Базовый форум (треды, посты, комментарии)
- [ ] Авторизация (email + Google OAuth)
- [ ] Профили пользователей
- [ ] Галерея астрофото
- [ ] Деплой (Vercel + Railway)
- [ ] PWA

### v1.0 — 6–8 месяцев
- [ ] Sky Planner (карта неба + погода)
- [ ] Дневник наблюдений
- [ ] Карта тёмных мест (PostGIS)
- [ ] AI-ассистент (Claude API)
- [ ] Plate solving при загрузке фото
- [ ] Уведомления о событиях

### v2.0 — 12 месяцев
- [ ] React Native приложение (iOS + Android)
- [ ] Казахский язык интерфейса
- [ ] Citizen Science интеграция
- [ ] Система достижений и геймификация
- [ ] Публичный API

---

## Разделы форума

| Раздел | Подразделы |
|---|---|
| Наблюдения | Планеты, Deep Sky, Кометы, Метеоры |
| Астрофото | Галактики, Туманности, Обработка |
| Техника | Телескопы, Камеры, Монтировки, DIY |
| Наука | Новости, arXiv, Астрофизика |
| Сообщество | Новички, Клубы, Купля-продажа |
| СНГ и ЦА | Казахстан, Обсерватории, Тёмные места |

---

## Участие в разработке

Проект открыт для контрибьюторов. Если ты астроном, разработчик или дизайнер — добро пожаловать.

```bash
# Создать ветку для фичи
git checkout -b feature/название-фичи

# Сделать изменения и закоммитить
git commit -m "feat: описание изменения"

# Открыть Pull Request
git push origin feature/название-фичи
```

Перед отправкой PR убедись что тесты проходят:

```bash
# Бэкенд
cd backend && pytest

# Фронтенд
cd frontend && npm run test
```



*Аспандас — для тех, кто смотрит вверх* 🌙
