import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.barWidth = 15;
    }
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data, (d) => {
            if (d[this.props.filter[0].category] === this.props.filter[0].types[this.props.index]) {
                return d;
            }
        }).then(data => {
            function handleMouseOver(d, i, n) {
                d3.select(n[i]).attr({
                    fill: "green"
                });
            }
            let ages = {};
            // populate ages object, maps age to count of age
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

            let ageKeys = Object.keys(ages)
            // write text for how tall each bar is
            for (let i = 0; i < ageKeys.length; i++) {
                svg.append("text")
                    .attr("x", this.barWidth * (ageKeys[i]) + this.barWidth)
                    .attr("y", maxCount * 4 - 4 * ages[ageKeys[i]] + 100 - (maxCount + 2.4) * 4)
                    .text(ages[ageKeys[i]])
                    .attr("font-size", "8px")
                    .attr("fill", "black");
            }

            // create individual bar slice
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d) => d.Age * this.barWidth + 10)
                .attr("y", (d) => {
                    ages[d.Age] -= 1;
                    return maxCount * 4 - 4 * ages[d.Age] + 100 - (maxCount + 3) * 4;
                })
                .attr("width", this.barWidth)
                .attr("height", () => 4)
                .attr("fill", "black")
                .attr("stroke", "white")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOver);
            // x-axis
            svg.append("line")
                .attr("x1", 10)
                .attr("y1", 92)
                .attr("x2", this.barWidth * 5 * 13 + 10)
                .attr("y2", 92)
                .attr("stroke-width", 1)
                .attr("stroke", "#C5CAE9");
            // x-axis tick marks
            for (let i = 0; i < 14; i++) {
                svg.append("line")
                    .attr("x1", this.barWidth * i * 5 + 10)
                    .attr("y1", 92)
                    .attr("x2", this.barWidth * i * 5 + 10)
                    .attr("y2", 82)
                    .attr("stroke-width", 1)
                    .attr("stroke", "#C5CAE9");
                svg.append("text")
                    .attr("x", this.barWidth * i * 5 - 5 + 12)
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