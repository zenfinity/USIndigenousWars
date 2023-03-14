
// //Sum of Years Setup
let dataUrl_yearSum = "https://storage.googleapis.com/usindigenouswarsappdata/iWarsDfYearSum.csv"
let selDiv_yearSum = "sumTimeline"
let label_title_yearSum = "Sum of Simultaneous Wars Per Year"
let label_x_yearSum = "Sum of Years Years"
let label_y_yearSum = "Year"
let col_x_yearSum = 'Year'
let col_y_yearSum = 'SumWars'


// //Function Definitions
function makeplot(url, col_x, col_y) {
  
    d3.csv(url).then(function (data) {
        processData(data, col_x, col_y);
        // console.log("Inside makeplot()");
    });

};

function processData(allRows, col_x, col_y) {
    console.log("Inside processData()");
    // console.log(allRows)
    var x = [], y = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        x.push(row[col_x]);
        y.push(row[col_y]);
    };
    console.log('X', x, 'Y', y);
    var plot = makePlotly(x, y, label_title_yearSum, label_x_yearSum, label_y_yearSum, selDiv_yearSum);
    
    return plot;
}

function makePlotly(x, y, label_title, label_x, label_y, selDiv) {
    var plotDiv = document.getElementById(selDiv);

    var traces = [{
        x: x,
        y: y
    }];

    var layout = {
        title: label_title,
        titlefont: {
            family: 'Times New Roman, serif',
            size: 18,
            color: 'lightgrey'
            
        },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        xaxis: {
            title: label_x,
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
            title: label_y,
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

    Plotly.newPlot(plotDiv, traces, layout);
};


// //Run
makeplot(dataUrl_yearSum,col_x_yearSum,col_y_yearSum);

