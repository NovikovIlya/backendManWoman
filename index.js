const express = require('express');
const axios = require('axios'); // Подключаем Axios для выполнения запросов
const app = express();
const port = 3000;

app.get('/horoscope', async (req, res) => {
  try {
    const { woman, man } = req.query; // Получаем параметры из URL

    // Проверяем, что оба параметра присутствуют
    if (!woman || !man) {
      return res.status(400).json({ error: 'Необходимо указать женщину и мужчину' });
    }

    const url = `https://horoscopes.rambler.ru/api/front/v3/horoscope/compatibility/woman-${woman}/man-${man}/`;
    const response = await axios.get(url); // Выполняем GET-запрос с Axios

    res.json(response.data); // Возвращаем данные от Rambler
  } catch (error) {
    // Обрабатываем ошибки
    console.error('Ошибка при получении гороскопа:', error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
