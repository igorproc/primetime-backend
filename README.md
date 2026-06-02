# 🎬 PrimeTime Backend

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

> **Предупреждение:** Этот репозиторий разрабатывается по большой любви к хорошему коду. 
> Тут крутится бэкенд для будущего онлайн-кинотеатра **[next.primetime.su](https://next.primetime.su)**.

---

## ⚡ Ключевые Архитектурные Фичи

* **🔑 Сессионная JWT-авторизация с отзывом (Revocation):** Использование преимуществ stateless-JWT в связке с моментальным отзывом сессий через валидацию токенов по базе данных в `AuthGuard`.
* **📱 Device-Session Tracking:** Сессии жестко связываются с конкретным `clientId` и профилем платформы (Windows, Android, iOS), позволяя управлять сессиями на разных устройствах.
* **🤖 Telegram Auth Integration:** Защищенный вход через Telegram Login Widget с криптографической верификацией HMAC-SHA256 и проверкой времени жизни payload.
* **⚖️ Отказоустойчивый балансировщик API (Kinopoisk):** Динамический пул парсеров с автоматической ротацией API-токенов при исчерпании лимитов и горячим переключением балансировщиков (`changeCurrentBalancerOnActive`).
* **📦 Фоновые миграции на Bull Queue:** Быстрый неблокирующий импорт медиа-каталога пачками в фоновом режиме через Redis.
* **🚀 Умный кэш фильмов:** Конкурентное сохранение и выборка связанных таблиц (`Promise.all`) и транслитерация кириллицы в SEO ЧПУ-урлы (slugs) «на лету».

---

## 🛠️ Технологический Стек

* **Framework:** NestJS (Express)
* **Language:** TypeScript
* **Database & ORM:** MySQL & Prisma ORM
* **Queue System:** Bull Queue (на базе Redis)
* **Reverse Proxy:** Caddy Server & Nginx
* **Testing & Tools:** Jest, Supertest, Swagger (`@nestjs/swagger`)
* **Environment:** Docker Compose (изолированная подсеть)

---

## 📂 Структура Проекта

```bash
primetime-backend/
├── Docker/                  # Докерфайлы сборки
├── prisma/                  # Схема базы данных Prisma Schema & Миграции
├── scripts/                 # Вспомогательные скрипты (генерация типов)
├── test/                    # Сквозные (E2E) и интеграционные тесты
└── src/                     # Исходный код бэкенда
    ├── auth/                # Авторизация (JWT, Сессии, Telegram-провайдер)
    ├── config/              # Модульные конфигурации проекта
    ├── content/             # Каталог, кэш фильмов и балансировщики API
    ├── db/                  # Контекст подключения к БД
    ├── decorators/          # Кастомные декораторы
    ├── device/              # Управление сессиями устройств
    ├── migrations/          # Фоновые воркеры импорта (Bull Queue Consumers)
    ├── movie/               # Жанры и Страны (Справочники)
    ├── roles/               # Иерархия ролей и прав доступа (RBAC)
    └── utils/               # Криптография, транслитерация и время
```

---

## 🚀 Быстрый Старт

### 1. Подготовка Окружения
Сделай копию конфигурационного файла среды и заполни её своими ключами:
```bash
cp .env.example .env
```
*(Только тссс... держи ключи в безопасности!).*

### 2. Запуск Инфраструктуры (Docker)
Запусти изолированные контейнеры приложения и Redis:
```bash
docker-compose up --build -d
```

### 3. Накатывание Базы Данных (Prisma)
Установи зависимости, сгенерируй клиент Prisma и накати актуальные миграции:
```bash
# Установка пакетов
npm install

# Применение миграций БД
npx prisma migrate dev
```

### 4. Запуск в режиме Разработки
```bash
npm run start:dev
```
Приложение запустится локально на [http://localhost:3001](http://localhost:3001).

---

## 📜 Доступные Скрипты

* `npm run start:dev` — Запуск бэкенда в режиме hot-reload (наблюдение за изменениями).
* `npm run build` — Сборка продакшн-бандла в директорию `dist/`.
* `npm run generate:types` — Генерация TypeScript-типов и SDK-клиента из Swagger-спецификации (для интеграции с фронтендом).
* `npm run make:migration` — Автоматическое форматирование схемы, валидация и создание новой миграции Prisma.
* `npm run lint` — Проверка кода линтером ESLint.
* `npm run test` — Запуск модульных тестов с использованием Jest.

---

## 📖 API Документация (Swagger)

В проект встроен интерактивный Swagger UI.  
После запуска бэкенда откройте в браузере:
👉 **[http://localhost:3001/docs](http://localhost:3001/docs)** (или ваш `$APP_URL/docs` на сервере).

Там вы найдете спецификации всех эндпоинтов авторизации, устройств, контента и балансировщиков.

---

## 🔒 Лицензия

Проект распространяется под лицензией **MIT**. Разрабатывайте в удовольствие! 🥂
