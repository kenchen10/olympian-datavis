import React, {Component} from 'react'
import './App.css'
import BarChart from './js/BarChart'
import data from './data/usa_rio.csv'
import * as d3 from "d3";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: data,
      width: 1000,
      height: 300
    }
    this.toRender = [];
  }

  filterByCountry = (country) => {
    return;
  };
  render() {
    let filter = ["Sport", "Swimming"];
    return (
      <div className="App">
        <BarChart data={data} filter={filter} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App
