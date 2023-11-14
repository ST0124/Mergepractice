fetch("./practice1/co2_mm_mlo.txt")
  .then((res) => res.text())
  .then((text) => {
    var lines = text.split(/\r\n|\n/);
    var dataArray = [];

    for (var i = 54; i < lines.length; i++) { 
      var line = lines[i].trim();
      if (line) {
        line = line.replace(/-0.99|-9.99|-1/g, '0');
        var elements = line.split(/\s+/);

        for (var j = 0; j < elements.length; j++) {
          elements[j] = parseFloat(elements[j]);
        }

        dataArray.push(elements);
      }
    }
    let myGraph = document.getElementById('myGraph');
    let trace1 = {};
    trace1.mode = "lines";
    trace1.type = "scatter";
    trace1.name = '去除季節性'

    trace1.x = [];
    trace1.y = [];

    for(let i=0;i<dataArray.length;i++){
        trace1.x[i] = dataArray[i][2];
        trace1.y[i] = dataArray[i][4];
    }
    
    let trace2 = {};
    trace2.mode = "lines";
    trace2.type = "scatter";
    trace2.name = '月平均'

    trace2.x = [];
    trace2.y = [];

    for(let i=0;i<dataArray.length;i++){
        trace2.x[i] = dataArray[i][2];
        trace2.y[i] = dataArray[i][3];
    }

    let data = [];
    data.push(trace1);
    data.push(trace2);

    let layout = {
        margin:{
            t:30
        },
        title: 'Atmospheric CO2 at Mauna Loa Observatory',
        xaxis: {
          title: 'Year',
        },
        yaxis: {
          title: 'CO2 mole fraction (ppm)',
        }
    };

    Plotly.newPlot(myGraph, data, layout);
   })
  .catch((e) => console.error(e));
