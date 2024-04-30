import React from 'react';

const Popup = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-318 h-173 rounded-tl-22 bg-white shadow-popup flex flex-col items-center justify-center">
        <p className="text-center font-HelveticaNeueCyr text-12 font-normal mb-6">
          Статистику за последние 3 месяца можно просмотреть в проекте с тарифным планом Pro. Создайте проект или перейдите к существующему проекту для обновления.
        </p>
        <button className="w-220 h-40 px-106 py-6 gap-10 rounded-10 bg-blue-500 text-white font-HelveticaNeueCyr text-14 font-semibold">
          Обновиться до Pro
        </button>
      </div>
    </div>
  );
};

export default Popup;