import React from 'react';


// Shows what was meals that were eaten today, with grams next to them
function EatenToday({ }) { // endpoint : /getDay/20250506
    const [data, setData] = useState < Map < string, any>> (new Map());
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

    return (<div style={{ border: "2px solid white", padding: "10px", }}>
        <h2>What you have eaten today with grams</h2>
        <ul>
        </ul>
    </div>
    );
}

export default EatenToday;