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
    let filter = [["Sport", "Swimming"], ["Sport", "Weightlifting"]];
    for (let i = 0; i < filter.length; i++) {
      this.toRender.push(<BarChart key={i} data={data} filter={filter} width={this.state.width} height={this.state.height} index={i} />)
    }
    return (
      <div className="App">
        {this.toRender}
      </div>
    );
  }
}

export default App
