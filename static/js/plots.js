// // Display the default plot
// function init() {

//     d3.csv('static/data/iWarsDfYearSum.csv').then(function (data) {
//         console.log(data[0]['Year']);
//         //     var trace1 = {
//         //         x: data['TribeName'],
//         //         y: [10, 11, 12, 13],
//         //         mode: 'markers',
//         //         marker: {
//         //             size: [40, 60, 80, 100]
//         //         }
//         //     };

//         //     var input = [trace1];

//         //     var layout = {
//         //         title: 'Marker Size',
//         //         showlegend: false,
//         //         height: 600,
//         //         width: 600
//         //     };

//         //     Plotly.newPlot('plot-dot', input, layout);
//     });
// };
// https://storage.googleapis.com/usindigenouswarsappdata/iWarsDfYearSum.csv
// static/data/iWarsDfYearSum.csv
function makeplot() {
  
    var csvData = d3.csv("https://storage.googleapis.com/usindigenouswarsappdata/iWarsDfYearSum.csv").then(function (data) {
        processData(data);
        console.log("Inside makeplot csv data()");
        console.log(data)

        return data;
    });
    console.log("Inside makeplot()");
    console.log(csvData)

    return csvData;
};

function processData(allRows) {
    console.log("Inside processData()");
    // console.log(allRows)
    var x = [], y = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        x.push(row['Year']);
        y.push(row['SumWars']);
    };
    console.log('X', x, 'Y', y);
    makePlotly(x, y);
}

function makePlotly(x, y) {
    var plotDiv = document.getElementById("sumTimeline");

    var traces = [{
        x: x,
        y: y
    }];

    var layout = {
        title: "Sum of Simultaneous Wars",
        titlefont: {
            family: 'Times New Roman, serif',
            size: 18,
            color: 'lightgrey'
            
        },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        xaxis: {
            // title: 'Year',
            titlefont: {
              family: 'Open Sans, sans-serif',
              size: 12,
              color: 'lightgrey'
            },
            showticklabels: true,
            tickangle: 'auto',
            tickfont: {
              family: 'Open Sans, sans-serif',
              size: 12,
              color: 'lightgrey'
            },
            gridcolor: 'darkgrey',
            exponentformat: 'e',
            showexponent: 'all'
          },
          yaxis: {
            title: 'Sum of Wars',
            showgrid: false,
            titlefont: {
              family: 'Open Sans, sans-serif',
              size: 12,
              color: 'lightgrey'
            },
            showticklabels: true,
            tickangle: 0,
            tickfont: {
              family: 'Open Sans, sans-serif',
              size: 12,
              color: 'lightgrey'
            }
        },
        height: 300,
        width: 1000
    };

    Plotly.newPlot('sumTimeline', traces, layout);
};

console.log("Outside");

let plotData = makeplot();

console.log(plotData)

// // // On change to the DOM, call getData()
// // d3.selectAll("#selDataset").on("change", getData);

// // // Function called by DOM changes
// // function getData() {
// //   let dropdownMenu = d3.select("#selDataset");
// //   // Assign the value of the dropdown menu option to a letiable
// //   let dataset = dropdownMenu.property("value");
// //   // Initialize an empty array for the country's data
// //   let data = [];

// //   if (dataset == 'australia') {
// //     data = australia;
// //   }
// //   else if (dataset == 'brazil') {
// //     data = brazil;
// //   }
// //   else if (dataset == 'uk') {
// //     data = uk;
// //   }
// //   else if (dataset == 'mexico') {
// //     data = mexico;
// //   }
// //   else if (dataset == 'singapore') {
// //     data = singapore;
// //   }
// //   else if (dataset == 'southAfrica') {
// //     data = southAfrica;
// //   }
// //   // Call function to update the chart
// //   updatePlotly(data);
// // }

// // // Update the restyled plot's values
// // function updatePlotly(newdata) {
// //   Plotly.restyle("pie", "values", [newdata]);
// // }

// init();

// let data = d3.csv("static/data/iWarsDfTribes.csv");
// console.log(data);
// console.log("after");
