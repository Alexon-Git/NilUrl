import React from "react";
import "./errorPage.css";
import { Helmet } from "react-helmet";

const ErrorPage = () => {

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="error-404">
        <Helmet>
          <title>Ошибка 404</title>
        </Helmet>
        <div className="error-text">
          <h1 className="error-code">404</h1>
          <p className="error-message">
            Упс... страница не найдена.<br />
            Возможно, ссылка была удалена.
          </p>
            
          <button className="button9" onClick={handleBack}>
      Вернуться
    </button>
        </div>
      </div>
  );
};

export default ErrorPage;
