import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const svg = d3.select("body")
            .append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height);
        svg.selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => 10 + i * 45)
            .attr("y", (d, i) => this.props.height - d * 10)
            .attr("width", 25)
            .attr("height", (d, i) => 10 * d)
            .attr("fill", "green");
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;