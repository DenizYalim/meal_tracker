import React, { useState } from 'react';

function DateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateForApi = () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  };

  const setDateToYesterday = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const setDateToTomorrow = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
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