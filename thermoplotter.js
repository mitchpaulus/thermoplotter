var viewModel = {
    inputText: ko.observable("Fake Test")
};

ko.applyBindings(viewModel);

var margin = {
    top: 50,
    bottom: 75,
    left: 75,
    right: 50,
}

var fullHeight = 750;
var fullWidth  = 900;

var height = fullHeight - margin.bottom - margin.top;
var width  = fullWidth - margin.left - margin.right;




var data = [{x: 1, y:2},
{x:2, y:4}, {x: 8, y:3}
];


var vaporDomeData;


var something = d3.csv("T-s-vapor-dome-data-water.csv",function(error, data) {
    if (error) throw error;
    vaporDomeData = data;

    var svg = d3.select('#figure')
        .attr("width",fullWidth)
        .attr("height",fullHeight)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var xRange = d3.scaleLinear().domain([0, 10]).range([0,width]);
    var yRange = d3.scaleLinear().domain([0,400]).range([height,0]);

    var yAxis = d3.axisLeft(yRange);
    var xAxis = d3.axisBottom(xRange);

    var line = d3.line().x(function (dataPoint) { return xRange(dataPoint.Entropy)})
        .y(function(dataPoint) {return yRange(dataPoint.Temp)})
        .curve(d3.curveNatural)(vaporDomeData);

    svg.append("path").attr("class","line").attr("d",line).attr("stroke",
            "rgb(255,0,0)").attr("stroke-width","4").attr("fill","none");

    //leftAxis(svg);

    yAxis.ticks(10);
    //yAxis(svg);

    svg.append("g").call(yAxis);
    svg.append("g").call(xAxis).attr("transform","translate(0,"+height+")") ;

    svg.append("text").text("Entropy [kJ/(kg K)]").attr("transform","translate(" + xRange(8) + "," + yRange(-30) + ")");
    svg.append("text").text("Temperature [\u00b0C]").attr("transform","translate(" + xRange(-0.75) + "," + yRange(300) + ") rotate(-90)");


});




//svg.append("line").attr("x1", xRange(data[0].x)).attr("y1",
//       xRange(data[0].y)).attr("x2", xRange(data[1].x)).attr("y2",
//      xRange(data[1].y)).attr("stroke", "rgb(255,0,0)");


console.log(xRange(5));


