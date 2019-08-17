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
            const svg = d3.select(".App")
                .append("svg")
                .attr("width", this.props.width)
                .attr("height", 100)
                .style("margin-left", 100);

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d) => d.Age * 15 + 10)
                .attr("y", (d) => {
                    ages[d.Age] -= 1;
                    return maxCount * 4 - 4 * ages[d.Age] + 100 - (maxCount + 3) * 4;
                })
                .attr("width", 15)
                .attr("height", () => 4)
                .attr("fill", "black")
                .attr("stroke", "white");
            svg.append("line")
                .attr("x1", 10)
                .attr("y1", 92)
                .attr("x2", 15 * 5 * 13 + 10)
                .attr("y2", 92)
                .attr("stroke-width", 1)
                .attr("stroke", "#C5CAE9");
            for (let i = 0; i < 14; i++) {
                svg.append("line")
                    .attr("x1", 15 * i * 5 + 10)
                    .attr("y1", 92)
                    .attr("x2", 15 * i * 5 + 10)
                    .attr("y2", 82)
                    .attr("stroke-width", 1)
                    .attr("stroke", "#C5CAE9");
                svg.append("text")
                    .attr("x", 15 * i * 5 - 5 + 12)
                    .attr("y", 100)
                    .text(i * 5)
                    .attr("font-size", "8px")
                    .attr("fill", "black");
            }
        });
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;