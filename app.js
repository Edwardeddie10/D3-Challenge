// @TODO: YOUR CODE HERE!

// set up the width, height and margin
var width = parseInt(d3.select("#scatter").style("width"));

var height = width - width / 3.9;

// Margin set up
var margin = {
    top: 20, 
    right: 40, 
    bottom: 40,
    left: 40
  };

  //  chart height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

// create scatter, chart, graph
var chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);
var svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

  //append group svg
var chartGroup = svg.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);

// x and y axis
var chosenXAxis = 'poverty';
var chosenYAxis = 'healthcare';



// x-scale variable function transformation upon update
function xScale(censusData, chosenXAxis) {
    //scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
        d3.max(censusData, d => d[chosenXAxis]) * 1.2])
      .range([0, width]);

    return xLinearScale;
}
//y-scale variable function transformation upon update
function yScale(censusData, chosenYAxis) {
  //scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
      d3.max(censusData, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);

   return yLinearScale;
}
//xAxis variable function transformation upon update
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(300).call(bottomAxis);
  
    return xAxis;
  }
  
  //yAxis variable function transformation upon update
  function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(300).call(leftAxis);

    return yAxis;
  }
//funtion for updating circles group
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    //poverty
    if (chosenXAxis === 'In poverty') {
      var xLabel = 'In Poverty:';
    }
    //income
    else if (chosenXAxis === 'Household income'){
      var xLabel = 'ousehold Income:';
    }
    //age
    else {
      var xLabel = 'Age:';
    }
//Y label
  //healthcare
  if (chosenYAxis ==='Lacks healthcare') {
    var yLabel = "Lacks Healthcare:"
  }
  else if(chosenYAxis === 'obese') {
    var yLabel = 'Obese:';
  }
  //smoking
  else{
    var yLabel = 'Smokes:';
  }

  // Import our CSV data with d3's .csv import method.
d3.csv("assets/data/data.csv").then(function(data) {



  