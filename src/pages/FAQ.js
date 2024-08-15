import React, { useState, useEffect } from "react";
import "./faq.css";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree";
import NoLoginHeader from "../components/no-login-header/NoLoginHeader";
import "../styles/Global/HeaderMainPage.css";
import useAuth from "../pages/useAuth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const FAQ = () => {
  const accessToken = Cookies.get("access_token");
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [userStatus, setUserStatus] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const user_status = decodedToken.user_status;
      setUserStatus(user_status);
    }
    if (!isLoading && !isLoggedIn && !isRedirected) {
      setIsRedirected(true);
      setUserStatus("no_login");
    }
  }, [
    isLoading,
    isLoggedIn,
    navigate,
    isRedirected,
    setIsRedirected,
    accessToken,
  ]);

  const questions = [
    "Функционал NIL URL",
    "Как создать короткую ссылку?",
    "UTM builder",
    "Срок годности",
    "Таргетинг на устройства",
    "Комментарии к ссылке",
  ];

  const handleQuestionClick = (index) => {
    setExpandedIndex(index);
  
    if (window.innerWidth <= 1199) {
      setIsSidebarVisible(false); // Автозакрытие для мобильных устройств
    }
  };

  const answers = [
    <>
      <p>
        Если вы маркетолог или владелец бизнеса, <strong>NIL URL</strong>{" "}
        предлагает идеальный набор функций для эффективного управления
        маркетинговыми кампаниями с помощью коротких ссылок:
      </p>
      <ul>
        <li>
          <strong>Мощный конструктор ссылок</strong>: наш{" "}
          <strong>конструктор ссылок</strong> включает функции, такие как{" "}
          <strong>конструктор UTM</strong>,{" "}
          <strong>таргетинг на устройства</strong>,{" "}
          <strong>сроки действия</strong> и многое другое.
        </li>
        <li>
          <strong>Важная аналитика</strong>: мы предоставляем{" "}
          <strong>мощную аналитику</strong> для ссылок, включая информацию о
          геолокации, устройстве, браузере и реферере.
        </li>
        <li>
          <strong>Бесплатный генератор QR-кодов</strong>: мы встроили генератор
          QR-кодов, позволяющий генерировать фирменные QR-коды для ссылок прямо
          в <strong>NIL URL</strong>.
        </li>
      </ul>
      <br></br>
      <center>
        <img className="faq-img" src="/faq-screen-1.png" alt="Screenshot" />
      </center>
      <center>
        <em>Скриншот страницы аналитики для короткой ссылки на NIL URL</em>
      </center>
      <br></br>
      <h2>Кто использует NIL URL?</h2>
      <p>
        <strong>NIL URL</strong> идеально подходит для современных маркетинговых
        команд, которым нужен лучший инструмент управления ссылками для
        маркетинговых кампаний.
      </p>
      <h2>Чем NIL URL отличается от других альтернатив?</h2>
      <p>
        В компании <strong>NIL URL</strong> мы гордимся лучшим дизайном и
        удобством использования среди всех инструментов управления ссылками на
        рынке. Было потрачено бесчисленное количество часов на совершенствование
        этого продукта, и он продолжает улучшаться.
      </p>
      <p>
        Наша фирменная особенность — возможность{" "}
        <strong>настраивать карточки социальных сетей</strong> для ссылок. Эта
        функция меняет правила игры для маркетологов, желающих получить полный
        контроль над внешним видом ссылок при публикации в социальных сетях.
      </p>
      <p>
        <strong>NIL URL</strong> также предлагает самый щедрый бесплатный
        тарифный план в отрасли. С помощью бесплатного уровня{" "}
        <strong>NIL URL</strong> появляется возможность:
      </p>
      <ul>
        <li>Обновлять назначение ссылки столько раз, сколько хочется</li>
        <li>
          Получать <strong>подробную аналитику</strong> эффективности ссылок,
          включая информацию о геолокации, устройстве, браузере и реферере
        </li>
      </ul>
      <p>
        Начните использовать <strong>NIL URL</strong> уже сегодня,{" "}
        <strong>создав рабочее пространство</strong>!
      </p>
    </>,
    /* ----------------------------------------------------------------------------- */
    <>
      <p>
        Узнайте, как создать свою первую короткую ссылку на
        <strong>NIL URL</strong> и начать её отслеживание.
      </p>
      <p>
        Конструктор ссылок <strong>NIL URL</strong> предлагает мощные функции,
        такие как <strong>UTM builder</strong>,
        <strong>таргетинг на устройства</strong>,<strong>защита паролем</strong>
        , <strong>сроки действия</strong> и многое другое.
      </p>
      <p>
        <strong>NIL URL</strong> — единственный инструмент управления ссылками,
        позволяющий настраивать карточки социальных сетей для ссылок. Это
        позволяет полностью контролировать дизайн ссылок при публикации в
        социальных сетях.
      </p>
      <p>
        Рассмотрим, как использовать эти функции для создания своей первой
        короткой ссылки на <strong>NIL URL</strong>.
      </p>
      <h2>
        <strong>Конструктор ссылок NIL URL</strong>
      </h2>
      <br></br>
      <center>
        <p>
          <img
            className="faq-img"
            src="/faq-screen-2.png"
            alt="Конструктор ссылок NIL URL"
          />
        </p>
      </center>
      <br></br>
      <p>
        <em>Конструктор ссылок NIL URL</em> включает:
      </p>
      <ul>
        <li>
          <strong>Целевой URL</strong>: ссылка, которую необходимо сократить.
        </li>
        <li>
          <strong>Короткая ссылка</strong>: сгенерированная уникальная короткая
          ссылка. Можно придумать собственный фрагмент.
        </li>
        <li>
          <strong>Выбор тега</strong> (для пользовательских доменов): позволяет
          упорядочивать ссылки по тегам. Узнайте больше о тегах{" "}
          <a href="#">здесь</a>.
        </li>
        <li>
          <strong>Комментарии</strong>: добавление комментариев к ссылкам для
          командного использования. <a href="#">Узнать больше</a>.
        </li>
        <li>
          <strong>Конструктор UTM</strong>: добавление UTM-параметров к ссылкам.{" "}
          <a href="#">Узнать больше</a>.
        </li>
        <li>
          <strong>Пользовательские карточки в социальных сетях</strong>:
          настройка внешнего вида ссылок при публикации в социальных сетях.{" "}
          <a href="#">Узнать больше</a>.
        </li>
        <li>
          <strong>Дата истечения срока действия</strong>: установка даты
          истечения срока действия ссылок. <a href="#">Узнать больше</a>.
        </li>
        <li>
          <strong>Таргетинг на устройства</strong>: назначение уникального
          целевого URL для устройств iOS и Android.{" "}
          <a href="#">Узнать больше</a>.
        </li>
        <li>
          <strong>Геотаргетинг</strong> (только для Pro-плана): перенаправление
          пользователей на разные ссылки в зависимости от их местоположения.{" "}
          <a href="#">Узнать больше</a>.
        </li>
      </ul>
    </>,
    /* ----------------------------------------------------------------------------- */
    <>
      <p>UTM</p>
    </>,
    /* ----------------------------------------------------------------------------- */
    <>
      <p>
        Узнайте, как использовать функцию автоматического истечения срока
        действия ссылок на <strong>NIL URL</strong> по истечении определенной
        даты и времени.
      </p>
      <p>
        Эта функция доступна только для
        <strong>тарифных планов Pro и выше</strong>.
      </p>
      <p>
        В разделе <strong>NIL URL</strong> легко задать дату истечения для
        ссылок. Достаточно активировать опцию "Срок действия ссылки" в
        конструкторе ссылок. Это позволяет управлять доступностью ссылок и
        автоматически отключать их по истечении указанного срока.
      </p>
      <p>
        После истечения срока действия ссылки пользователи увидят страницу
        "Ссылка с истекшим сроком действия" при попытке перейти по ней.
      </p>
      <br></br>
      <center>
        <img
          className="faq-img"
          src="/faq-screen-3.png"
          alt="Пример настройки срока действия ссылки"
        />
      </center>
      <br></br>
      <p>
        Примечание: все переходы по ссылке после истечения срока действия{" "}
        <strong>не</strong> будут отслеживаться.
      </p>
      <h2>
        <strong>
          Настройка пользовательского URL с истекшим сроком действия
        </strong>
      </h2>
      <p>
        Можно задать пользовательский URL-адрес для истекших ссылок. Это полезно
        для перенаправления пользователей на определенную страницу после
        истечения срока действия ссылки.
      </p>
      <p>
        Для этого введите пользовательский URL-адрес в поле{" "}
        <strong>URL-адрес с истекшим сроком действия</strong> в разделе "Срок
        действия ссылки".
      </p>
      <br></br>
      <center>
        <img
          className="faq-img"
          src="/faq-screen-4.png"
          alt="Пример настройки срока действия ссылки"
        />
      </center>
      <br></br>
    </>,
    /* ----------------------------------------------------------------------------- */
    <>
      <p>
        Эта функция доступна только для
        <strong> тарифных планов Pro и выше</strong>.
      </p>
      <p>
        Таргетинг на устройства позволяет персонализировать целевой URL для
        ссылок в зависимости от типа устройства пользователя.
      </p>
      <p>
        Например, можно установить отдельный целевой URL для устройств iOS,
        активировав опцию "Таргетинг на iOS" в конструкторе ссылок, и другой URL
        для устройств Android, включив "Таргетинг на Android".
      </p>
      <br></br>
      <center>
        <img
          className="faq-img"
          src="/faq-screen-5.png"
          alt="Пример настройки таргетинга на устройства"
        />
        <p>
          <em>
            Используйте таргетинг на устройства, чтобы персонализировать
            поведение ссылки в зависимости от типа устройства пользователя
          </em>
        </p>
      </center>
      <br></br>
      <p>
        Эта функция особенно полезна для перенаправления пользователей iOS в App
        Store для загрузки приложения, а пользователей Android — в Google Play
        Store.
      </p>
      <p>
        В обоих случаях основной <strong>целевой URL</strong> используется в
        качестве резервного, если тип устройства пользователя не соответствует
        правилам таргетинга.
      </p>
    </>,
    /* ----------------------------------------------------------------------------- */
    <>
      <p>
        Узнайте, как добавлять комментарии к ссылкам в разделе{" "}
        <strong>NIL URL</strong> для обеспечения большего контекста.
      </p>
      <p>
        В <strong>NIL URL</strong> можно добавлять комментарии к ссылкам,
        активировав опцию "Комментарии" в конструкторе ссылок.
      </p>
      <br></br>
      <center>
        <img
          className="faq-img"
          src="/faq-screen-6.png"
          alt="Пример добавления комментариев к ссылкам"
        />
        <p>
          <em>Добавление комментариев к ссылкам</em>
        </p>
      </center>
      <br></br>
      <p>
        Примечание: гиперссылки поддерживаются в комментариях. Это позволяет
        добавлять больше контекста к ссылкам.
      </p>
      <br></br>
      <center>
        <img
          className="faq-img"
          src="/faq-screen-7.png"
          alt="Пример отображения комментариев на карточке ссылок"
        />
        <p>
          <em>
            Комментарии отображаются в виде пузырьков сообщений на карточке
            ссылок
          </em>
        </p>
      </center>
      <br></br>
    </>,
  ];

  return (
    <>
      <Helmet>
        <title>FAQ</title>
        <meta
          name="description"
          content="Часто задаваемые вопросы (FAQ) по NIL URL"
        />
      </Helmet>
      {userStatus === "no_login" ? (
        <NoLoginHeader />
      ) : userStatus === "free" ? (
        <HeaderLinksPageFree />
      ) : (
        <HeaderLinksPage />
      )}
      <div className={`faq-container ${isSidebarVisible ? "" : "collapsed"}`}>
        <div className="faq-sidebar">
          <button
            className={`toggle-sidebar-btn ${
              isSidebarVisible ? "open" : "closed"
            }`}
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h2>Часто задаваемые вопросы</h2>
          <ul>
            {questions.map((question, index) => (
              <li
                key={index}
                className={expandedIndex === index ? "active" : ""}
                onClick={() => handleQuestionClick(index)} 
                data-tooltip={question}
              >
                {question}
              </li>
            ))}
          </ul>
        </div>
        <div className="faq-content">
          <h2>{questions[expandedIndex]}</h2>
          <div>{answers[expandedIndex]}</div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
