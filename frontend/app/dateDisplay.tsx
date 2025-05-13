import React, { useState } from 'react';

let currentDate = new Date();

export const getDateForApi = () => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

function DateDisplay() {
  const [a, seta] = useState(new Date());

  const setDateToYesterday = () => {
    currentDate.setDate(currentDate.getDate() - 1)
    seta(new Date(a.setDate(a.getDate() - 1)));
  };

  const setDateToTomorrow = () => {
    currentDate.setDate(currentDate.getDate() + 1)
    seta(new Date(a.setDate(a.getDate() + 1)));
  };

  return (
    <>
      <h1>{getDateForApi()}</h1>
      <button onClick={setDateToYesterday}>Yesterday</button>
      <button onClick={setDateToTomorrow}>Tomorrow</button>
    </>
  );
}

export default DateDisplay;