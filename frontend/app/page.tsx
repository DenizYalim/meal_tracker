'use client';
import { useState } from 'react';

export default function Home() {
  const foods = ['apple', 'banana', 'carrot'];
  const besin = ['apple', 'banana', 'carrot'];
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});

  function handleChange(food: string, value: string) {
    setAmounts((prev) => ({ ...prev, [food]: value }));
  }

  function EatenToday({ foods }: { foods: string[] }) {
    return (<div>
      <h2>What did you eat today?</h2>
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

  function BesinToday({ besin }: { besin: string[] }) {
    return (<div>
      <h2>What did you eat today?</h2>
      <ul>
        {foods.map((food) => (
          <li key={food}>
            {food}
          </li>
        ))}
      </ul>
      </div>
    );
  }

  return (
    <div>
      
      <EatenToday foods={foods} />
      <BesinToday besin={besin} />
    </div>
  );
}
