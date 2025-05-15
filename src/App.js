import React, {Component} from 'react'
import './App.css'
import BarChart from './js/Components/BarChart'
import data from './data/usa_rio_unique_names.csv'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      width: 1000,
      height: 23 * 5
    }
    this.toRender = [];
  }

  filterByCountry = (country) => {
    return;
  };
  render() {
    let filter = [
      {
        category: "Sport",
        types: ['Archery', 'Athletics', 'Badminton', 'Basketball', 'Beach Volleyball', 'Boxing', 'Canoeing', 'Cycling', 'Diving', 'Equestrianism', 'Fencing', 'Football', 'Golf', 'Gymnastics', 'Hockey', 'Judo', 'Modern Pentathlon', 'Rhythmic Gymnastics', 'Rowing', 'Rugby Sevens', 'Sailing', 'Shooting', 'Swimming', 'Synchronized Swimming', 'Table Tennis', 'Taekwondo', 'Tennis', 'Trampolining', 'Triathlon', 'Volleyball', 'Water Polo', 'Weightlifting', 'Wrestling']
      }
    ];
    for (let i = 0; i < filter[0].types.length; i++) {
      this.toRender.push(
          <BarChart key={i} data={data} filter={filter} width={this.state.width} height={this.state.height} index={i} />
      )
    }
    return (
      <div className="App">
        <div className="title">Olympian Data Visualization</div>
        <div className="description">
          This is a visualization of Age Data of United States Olympians in Rio 2016 across sports. Naturally, different sports 
          have different age ranges. It is interesting to see these differences and analyze the possible reasons for them. Below we have graphs of 
          age data for each Olympic sport.
        </div>
        {this.toRender}
      </div>
    );
  }
}

export default App
