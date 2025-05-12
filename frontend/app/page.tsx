'use client';
import { useState } from 'react';
import RecipeList from './recipelist';
import EatenToday from './eatenToday';
import EditRecipe from './editRecipe';
import DateDisplay from './dateDisplay';

export default function Home() {
  const foods = ['apple', 'banana', 'carrot']; 
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});

  function handleChange(food: string, value: string) {
    setAmounts((prev) => ({ ...prev, [food]: value }));
  } 

  function NutritionGainedToday({ }) { // Should just call a Get endpoint called /calculatetotals/<int:date> 
    return (<div style={{ border: "2px solid white", padding: "10px" }}>Nutritions Gained Today</div>)
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
        <DateDisplay />
        <br></br> 
        <EatenToday />
        <br></br>
        <RecipeList />
        <br></br>
        <NutritionGainedToday />
        <br></br>
        <EditRecipe />
      </div>
    </div>
  );
}
