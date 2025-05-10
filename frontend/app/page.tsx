'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const foods = ['apple', 'banana', 'carrot'];
  const besin = ['apple', 'banana', 'carrot'];
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});

  function handleChange(food: string, value: string) {
    setAmounts((prev) => ({ ...prev, [food]: value }));
  }

  function EatenToday({ foods }: { foods: string[] }) { // endpoint : /getDay/20250506
    return (<div style={{ border: "2px solid white", padding: "10px", }}>
      <h2>What you have eaten today with grams</h2>
      <ul>
        {foods.map((food) => (
          <li key={food}>
            {food}:{' '}
            <input
              type="number"
              placeholder="grams"
              value={amounts[food] || ''}
              onChange={(e) => handleChange(food, e.target.value)}
              style={{ marginLeft: '8px' }}
            />
          </li>
        ))}
      </ul>
    </div>
    );
  } 

function RecipeList({ besin }: { besin: string[] }) {
  const [data, setData] = useState(null);
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

  // Call fetchData when the component renders for the first time
  if (!isDataFetched) {
    fetchData();
  }

  console.log("After data fetch");
  console.log(data);

  return (
    <div style={{ border: "2px solid white", padding: "10px" }}>
      <h2>Bugün yediklerin, Meal :</h2>
      <ul>
        {besin.map((food) => (
          <li key={food}>
            {food}, {besin.indexOf(food)}
          </li>
        ))}
      </ul>
    </div>
  );
} 


  function NutritionGainedToday({ }) { // Should just call a Get endpoint called /calculatetotals/<int:date> 
    return (<div style={{ border: "2px solid white", padding: "10px" }}>Nutritions Gained Today</div>)
  }

  function EditRecipe({ }) { // endpoint : addrecipe
    return (<div style={{ border: "2px solid white", padding: "10px" }}>Edit Recipe</div>)
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      height: "100vh",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "10px",
      }}>
        <br></br>
        <EatenToday foods={foods} />
        <br></br>
        <RecipeList besin={besin} />
        <br></br>
        <NutritionGainedToday />
        <br></br>
        <EditRecipe />
      </div>
    </div>
  );
}
