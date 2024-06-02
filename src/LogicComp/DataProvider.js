import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const DataContext = createContext();

// Компонент-провайдер для оборачивания приложения
export const DataProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <DataContext.Provider value={{ isPremium, setIsPremium }}>
      {children}
    </DataContext.Provider>
  );
};

// Хук для использования контекста
export const usePremium = () => useContext(DataContext);