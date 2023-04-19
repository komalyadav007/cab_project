import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [cab, setCab] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/book', { source, destination, cab });
      const { time, cost } = response.data;
      setTime(time);
      setCost(cost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Source:
          <input type="text" value={source} onChange={(event) => setSource(event.target.value)} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />
        </label>
        <br />
        <label>
          Cab:
          <select value={cab} onChange={(event) => setCab(event.target.value)}>
            <option value="">Select a cab</option>
            <option value="Cab 1">Cab 1</option>
            <option value="Cab 2">Cab 2</option>
            <option value="Cab 3">Cab 3</option>
            <option value="Cab 4">Cab 4</option>
            <option value="Cab 5">Cab 5</option>
          </select>
        </label>
        <br />
        <button type="submit">Book Now</button>
      </form>
      {time && <p>Time taken: {time} minutes</p>}
      {cost && <p>Estimated cost: {cost} Rupee</p>}
    </div>
  );
};

export default App;
