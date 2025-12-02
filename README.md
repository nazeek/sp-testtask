# StarPets - Тестовое задание

## ВАЖНО
при добавлении элементов в корзину, они добавляются неограниченно много раз и в корзине это не отображается в виде множителя. Это не баг, в ТЗ это поведение не описано, а в дизайне нет множителей, т.к. в реальном проекте добавление работает иначе, решил оставить так для удобства проверок.


## Roadmap
- виртуализация c tanstack vue-virtual
- приведение ошибок к общему виду
- unit-тесты не только для утилит



## Установка и запуск

либо

```
bash
docker-compose up -d
```

либо стандартно для nuxt-приложений
```
bash
npm i
npm run dev
```

в обоих случаях приложение запустится на: `http://localhost:3000`



## Технологический стек

- **Nuxt 4**
- **TypeScript**
- **Pinia**
- **Tanstack Query**
- **SCSS**
- **VueUse**

## Архитектура

**FSD**:

```
src/
├── app/          # Инициализация, провайдеры, глобальные стили
├── shared/       # Переиспользуемые компоненты и утилиты
├── entities/     # Бизнес-сущности (user, item, cart)
├── features/     # composables
├── widgets/      # Композитные блоки (header, filters, items-list, cart)
└── pages/        # Страницы приложения
```



## Структура проекта

### Конфигурация

- `src/shared/config/` - константы, API endpoints, enum'ы
- `nuxt.config.ts` - конфигурация Nuxt

### API

- `src/shared/lib/api/` - API client и функции запросов
- `server/api/` - server handlers (моковые)

### Stores (Pinia)

- `src/entities/user/model/store.ts` - пользователь
- `src/entities/cart/model/store.ts` - корзина

### Features (Composables)

- `src/features/infinite-scroll/` - логика скролла
- `src/features/filter-items/` - управление фильтрами
- `src/features/add-to-cart/` - добавление в корзину
- `src/features/purchase/` - логика покупки с проверкой баланса


## API

### Получение списка предметов

```
POST https://market.apineural.com/api/store/items/all
```

### Server handlers

- `GET /api/user/profile` - профиль пользователя (мок, включает баланс)
