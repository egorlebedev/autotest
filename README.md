# autotest

#### Установка
1. `npm install`
2. Переименовываем projects/PROJECT_NAME в соотвествии с названием проекта. Редактируем projects/PROJECT_NAME/config.js

#### Запуск тестов
`node start`

Будут выполнятся тесты всех проектов, в соответствии с заданной в config.js частотой.
Карта сайта генерируется автоматически.

#### Ручной запуск основного теста:
`node app projects/PROJECT_NAME/common/`

#### Ручной запуск создание карты сайта
`node sitemap PROJECT_NAME`

#### Кастомные тесты

Регулярные тесты, которые должны крутится на сервере размещаем, в projects/PROJECT_NAME/common_ext

Свои тесты размещаем в projects/PROJECT_NAME/TEST_NAME
