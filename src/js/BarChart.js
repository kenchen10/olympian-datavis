import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data, (d) => {
            if (d[this.props.filter[0].category] === this.props.filter[0].types[this.props.index]) {
                return d;
            }
        }).then(data => {
            let ages = {};
            data.forEach(d => {
                if (d.Age in ages) {
                    ages[d.Age] += 1;
                } else {
                    ages[d.Age] = 1;
                }
            });
            let maxCount = d3.max(Object.keys(ages).map(d => ages[d]));
            const svg = d3.select("body")
                .append("svg")
                .attr("width", this.props.width)
                .attr("height", 100)
                .style("margin-left", 100);
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d) => d.Age * 15)
                .attr("y", (d) => {
                    ages[d.Age] -= 1;
                    return maxCount * 4 - 4 * ages[d.Age] + 100 - (maxCount + 1) * 4;
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