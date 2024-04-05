import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const RedirectPage = () => {
  const history = useHistory();
  const { shortLink } = useParams();

  useEffect(() => {
    // сбор информации о пользователе на короткой странице
    setTimeout(() => {
      // Реализация логики для сбора информации о пользователе
      // После сбора информации о пользователе перенаправляем на длинную ссылку
      history.push(getLongLink(shortLink));
    }, 500); // Задержка в 0.5 секунды для симуляции открытия страницы на короткой ссылке
  }, [history, shortLink]);

  return (
    <>
    </>
  );
};

// Функция, которая по короткой ссылке возвращает длинную ссылку
const getLongLink = (shortLink) => {
  // Логика получения длинной ссылки по короткой
  // В данном примере возврат короткой ссылки в качестве длинной
  return shortLink;
};

export default RedirectPage;

// сырая черновая наработка редиректа. Для начала нужно сделать бд