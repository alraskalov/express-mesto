# Проект Mesto фронтенд + бэкенд

## Директории

+ `/routes` — папка с файлами роутера
+ `/controllers` — папка с файлами контроллеров пользователя и карточки
+ `/models` — папка с файлами описания схем пользователя и карточки

## Функциональность

+ `GET /users` — возвращает всех пользователей из базы
+ `GET /users/:userId` - возвращает пользователя по _id
+ `GET /cards` — возвращает все карточки из базы
+ `POST /cards` — создаёт карточку с переданными в теле запроса name и link
+ `PATCH /users/me` — обновляет профиль
+ `PATCH /users/me/avatar` — обновляет аватар
+ `PUT /cards/:cardId/likes` — поставить лайк карточке
+ `DELETE /cards/:cardId/likes` — убрать лайк с карточки
+ `DELETE /cards/:cardId` — удаляет карточку по _id


## Запуск проекта

+ `npm run start` — запускает сервер
+ `npm run dev` — запускает сервер с hot-reload
