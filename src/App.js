import React from 'react';
import './App.css';
import BarChart from './js/BarChart';

function App() {
  let state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500
  }
  return (
    <div className="App">
      <BarChart data={state.data} width={state.width} height={state.height} />
    </div>
  );
}

export default App;
