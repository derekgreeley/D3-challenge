// @TODO: YOUR CODE HERE!
/* <svg width="600", height="400">
<text transform="translate(300,300)">In Poverty (%)</text>
<text transform="translate(60, 135) rotate(-90)">Obesity (%)</text>
<circle cx="150" cy="150" r="12" class="stateCircle"></circle>
<text transform="translate(150,150)" class="stateText">ST</text>
</svg> */


//Activity 16.3.12

var data;

function importData(blah) {
     data = blah;
     runLater();
}

// d3.csv("assets/data/data.csv").then(importData);

var svgWidth = 960;
var svgHeight = 500;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg
    .append("text")
    .attr("transform", "translate(300,300)")
    .text("In Poverty (%)");

svg
    .append("text")
    .attr("transform", "translate(60,135) rotate(-90)")
    .text("Obesity (%)");

d3.csv("assets/data/data.csv").then(importData);

function runLater(){
    svg
        .append("circle")
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("r", 12)
        .attr("class", "stateCircle")

    svg
        .append("text")
        .attr("transform","translate(150,150)")
        .attr("class", "stateText")
        .attr("font-size", 10)
        .text("ST");
}

runLater()





// var step2 = svg.append('svg');
// var step3 = step2.attr("width", svgWidth);
// var step4 = svg.attr("height", svgHeight); 

// svg.append("svg").attr()...

//    .append("svg")
//    .attr("width", svgWidth)
//    .attr("height", svgHeight); 


// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
// };
  
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;
  
// var svg = d3
//   .select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight); 

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./data").then(function(data) {
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
console.log(data)

    var xLinearscale = d3.scaleLinear()
        .domain([20, d3.max(data, d => d.poverty)])
        .range([0,width]);
    var yLinearScale = d3.scaleLinear()
        .domain([20, d3.max(data, d => d.obesity)])
        .range([0,width]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .call(leftAxis);
  
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.num_hits))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");


    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80,-60])
    .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Obesity: ${d.obesity}`);
    });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    chartGroup.append("text");

    chartGroup.append("text");
    }).catch(function(error) {
    console.log(error);
});
