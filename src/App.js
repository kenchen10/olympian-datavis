import React from 'react'
import './App.css'
import BarChart from './js/BarChart'
import data from './data/usa_rio.csv'

function App () {
  const state = {
    data: data,
    width: 1000,
    height: 600
  }
  return (
    <div className="App">
      <BarChart data={data} width={state.width} height={state.height} />
    </div>
  );
}

export default App
