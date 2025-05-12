import React from 'react';
import { useState, useEffect } from 'react';

function RecipeList({ }: {}) {
    const [data, setData] = useState<Map<string, any>>(new Map());
    const [isDataFetched, setIsDataFetched] = useState(false);

    const fetchData = () => {
        if (!isDataFetched) {
            fetch("http://127.0.0.1:5000/recipeList")
                .then(response => response.json())
                .then(fetchedData => {
                    console.log(fetchedData);  // Logs the fetched data
                    setData(fetchedData);  // Updates the state
                    setIsDataFetched(true); // Ensure it doesn't fetch again
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    };

    if (!isDataFetched) {
        fetchData();
    }

    console.log("After data fetch");


    if (!data) {
        return <div><h2>Recipelist :</h2>Loading...</div>
    }
    console.log(data);

    const recipeListMap = new Map(Object.entries(data));

    console.log(recipeListMap)

    return (
        <div style={{ border: "2px solid white", padding: "10px" }}>
            <h1>Food Data Keys</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {[...recipeListMap.keys()].map((key) => (
                    <li
                        key={key}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            //borderBottom: '1px solid #ccc',
                        }}
                    >
                        <span>{key}</span>
                        <button style={{ cursor: 'pointer', padding: '5px 10px' }}>+</button> {/* Button should make api call with 100 grams  /addMealtoDay/<int:date> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;