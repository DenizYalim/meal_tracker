import React from 'react';
import { useState, useEffect } from 'react';
import DateDisplay, {getDateForApi}  from './dateDisplay';




// Shows what was meals that were eaten today, with grams next to them
function EatenToday({ date }: any) { // endpoint : /getDay/20250506
    const [data, setData] = useState<Map<string, any>>(new Map());
    const [isDataFetched, setIsDataFetched] = useState(false);

    const dateForApi = getDateForApi();
    console.log(getDateForApi().toString())
    const stringm = `http://127.0.0.1:5000/getDay/${dateForApi}`;

    // console.log(stringm)

    const fetchData = () => {
        if (!isDataFetched) {
            fetch(stringm)
                .then(response => response.json())
                .then(fetchedData => {
                    // console.log(fetchedData);  // Logs the fetched data
                    setData(fetchedData);  // Updates the state
                    setIsDataFetched(true); // Ensure it doesn't fetch again
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    };

    if (!isDataFetched) {
        fetchData();
    }



    if (!data) {
        return <div><h2>Recipelist :</h2>Loading...</div>
    }

    const eatenMap = new Map(Object.entries(data));
    const meals = eatenMap.get("meals");

    return (
        <div style={{ border: "2px solid white", padding: "10px" }}>
            <h1>Eaten Today</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {meals && Object.keys(meals).map((key) => (
                    <li key={key}>
                        {key} - {meals[key].grams} grams
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default EatenToday;