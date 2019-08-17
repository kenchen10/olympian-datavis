import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data).then(data => {
            let ages = {};
            const svg = d3.select("body")
                .append("svg")
                .attr("width", this.props.width)
                .attr("height", this.props.height)
                .style("margin-left", 100);

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d) => d.Age * 15)
                .attr("y", (d) => {
                    if (d.Age in ages) {
                        ages[d.Age] += 1;
                    } else {
                        ages[d.Age] = 1;
                    }
                    return this.props.height - 100 - 4 * ages[d.Age];
                })
                .attr("width", 15)
                .attr("height", () => 4)
                .attr("fill", "green")
                .attr("stroke", "white");
        });
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;