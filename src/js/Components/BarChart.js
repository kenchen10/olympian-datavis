import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.barWidth = 15;
        this.barHeight = 5;
    }
    componentDidMount() {
        this.drawChart();
    }

    renderXAxis(svg) {
        // x-axis
        svg.append("line")
            .attr("x1", 10)
            .attr("y1", this.props.height - 10)
            .attr("x2", this.barWidth * 5 * 13 + 10)
            .attr("y2", this.props.height - 10)
            .attr("stroke-width", 1)
            .attr("stroke", "#C5CAE9");
        // x-axis tick marks
        for (let i = 0; i < 14; i++) {
            svg.append("line")
                .attr("x1", this.barWidth * i * 5 + 10)
                .attr("y1", this.props.height - 10)
                .attr("x2", this.barWidth * i * 5 + 10)
                .attr("y2", this.props.height - 20)
                .attr("stroke-width", 1)
                .attr("stroke", "#C5CAE9");
            svg.append("text")
                .attr("x", this.barWidth * i * 5 - 5 + 12)
                .attr("y", this.props.height)
                .text(i * 5)
                .attr("font-size", "8px")
                .attr("fill", "black");
        }
    }

    renderBarSlice(svg, data, counts, maxCount) {
        var tooltip = d3.select(".App")
            .append("text")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("position", "absolute")
                .style("user-select", "none")
                .style("z-index", "-10");
        // create individual bar slice
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => d.Age * this.barWidth + 10)
            .attr("y", (d) => {
                counts[d.Age] -= 1;
                return maxCount * this.barHeight - this.barHeight * counts[d.Age] + this.props.height - (maxCount + 3) * this.barHeight;
            })
            .attr("width", this.barWidth)
            .attr("height", () => this.barHeight)
            .attr("fill", "black")
            .attr("stroke", "white")
            .on("mouseover", function(d) {
                d.EventMedal = d.EventMedal.replace(new RegExp("Gold", 'g'), `<img class="medal" src=${require("../../imgs/gold.png")} />`)
                d.EventMedal = d.EventMedal.replace(new RegExp("Silver", 'g'), `<img class="medal" src=${require("../../imgs/silver.png")} />`)
                d.EventMedal = d.EventMedal.replace(new RegExp("Bronze", 'g'), `<img class="medal" src=${require("../../imgs/bronze.png")} />`)
                d.EventMedal = d.EventMedal.replace(new RegExp("Did Not Place", 'g'), `${"No Medal".bold()}`)
                tooltip.transition().style("opacity", 1);
                tooltip.style("z-index", "10");
                d3.select(this).transition().style("stroke", "#EF5350");
            })
            .on("mouseout", function() {
                tooltip.transition().style("opacity", 0);
                tooltip.style("z-index", "-10");
                d3.select(this).transition().style("stroke", "white");
            })
            .on("mousemove", function(d) {
                tooltip.style("left", (d3.event.pageX + 2) + "px")
                    .style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(`
                    ${d.Name.bold()} 
                    </br> 
                    - ${"Sex".bold()}: ${d.Sex}
                    </br> 
                    - ${"Age".bold()}: ${Math.round(d.Age)}
                    </br>
                    - ${"Height".bold()}: ${d.Height} cm
                    </br>
                    - ${"Weight".bold()}: ${d.Weight} kg
                    </br>
                    - ${"Team".bold()}: ${d.Team}
                    </br>
                    - ${"Games".bold()}: ${d.Games} ${d.City}
                    </br>
                    - ${"Event".bold()}: ${d.EventMedal}
                `)
                    .style("transform", "translate(-50%, -100%)");
            });
    }

    drawChart() {
        d3.csv(this.props.data, (d) => {
            // filter by category
            if (d[this.props.filter[0].category] === this.props.filter[0].types[this.props.index]) {
                return d;
            }
        }).then(data => {
            let ages = {};
            // populate ages object, maps age to count of age
            data.forEach(d => {
                if (d.Age in ages) {
                    ages[d.Age] += 1;
                } else {
                    ages[d.Age] = 1;
                }
            });
            // get largest count of age
            let maxCount = d3.max(Object.keys(ages).map(d => ages[d]));
            const svg = d3.select(".App")
                .append("svg")
                .attr("width", this.props.width)
                .attr("height", this.props.height)
                .style("margin-top", 0);

            let ageKeys = Object.keys(ages)
            // write text for how tall each bar is
            for (let i = 0; i < ageKeys.length; i++) {
                svg.append("text")
                    .attr("x", this.barWidth * (ageKeys[i]) + this.barWidth)
                    .attr("y", maxCount * this.barHeight - this.barHeight * ages[ageKeys[i]] + this.props.height - (maxCount + 2.4) * this.barHeight)
                    .text(ages[ageKeys[i]])
                    .attr("font-size", "8px")
                    .attr("fill", "black");
            }
            this.renderBarSlice(svg, data, ages, maxCount);
            this.renderXAxis(svg);
            // add text for sport name
            data.forEach(d => {
                svg.append("text")
                    .text(d.Sport)
                    .attr("font-weight", "bold")
                    .attr("x", 0)
                    .attr("y", 90)
                    .attr("font-size", "20px")
                    .attr("fill", "black")
                    .attr("font-family", "Fontin");
            })
        });
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;