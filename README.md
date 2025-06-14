# GadgetHome - интернет-магазин бытовой техники и электроники  

## Описание проекта
Проект представляет собой современное веб-приложение для покупки бытовой техники и электроники. Пользователи могут искать товары, добавлять их в корзину, оформлять заказы с выбором пункта самовывоза и способа оплаты, а также просматривать историю своих покупок.

### Основная функциональность

1. **Регистрация и авторизация**  
   - Регистрация нового пользователя с проверкой длины и совпадения паролей.  
   - Вход в систему с хранением токена в localStorage/sessionStorage.  
   - Выход из системы с очисткой токена и данных пользователя.

2. **Просмотр каталога**  
   - Список товаров с фильтрацией по категориям.  
   - Детальная страница каждого товара с описанием, доступными цветами и ценой.  
   - Поиск товаров

3. **Корзина покупок**  
   - Добавление товара в корзину, изменение количества и удаление.  
   - Отображение итогового количества товаров и общей суммы.  
   - Выбор пункта самовывоза из списка адресов.  
   - Выбор способа оплаты (наличные / безнал).  
   - Оформление заказа.

4. **Личный кабинет**  
   - Просмотр профиля пользователя.  
   - Выход из системы.  
   - История заказов: список заказов с датой, статусом и суммой.  
   - Возможность просмотра детальной информации о каждой заказе: пункт самовывоза, способ оплаты и перечень товаров с цветом, количеством и ценой за единицу.

### Стек технологий

- **Front-end:** React, TypeScript, Redux Toolkit, React Router, Bootstrap  
- **HTTP-клиент:** Axios  
