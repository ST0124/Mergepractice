d3.csv('../GCB2022v27_MtCO2_flat.csv').then(data => {
    
    // 处理数据
    let df = data;
    
    df = df.filter(row => row['ISO 3166-1 alpha-3'] !== '');
    df = df.filter(row => row['Country'] !== 'Global' && row['Country'] !== 'International Transport');

    // 将 DataFrame 中的 NaN 值填充为 0
    df.forEach(row => {
        for (const key in row) {
            if (row[key] === '') {
                row[key] = 0;
            }
        }
    });
    // 创建一个新的对象，用于存储合并后的数据
    let mergedData = {};

    // 遍历原始数据，将相同 'Country' 的 "Coal", "Oil", "Gas", "Cement", "Flaring" 列值分别加起来
    df.forEach(row => {
        if (mergedData[row['Country']] === undefined) {
            mergedData[row['Country']] = {
                'Country': row['Country'],
                'Coal': 0,
                'Oil': 0,
                'Gas': 0,
                'Cement': 0,
                'Flaring': 0,
                'Other' : 0,
            };
        }
        mergedData[row['Country']]['Coal'] += parseInt(row['Coal']);
        mergedData[row['Country']]['Oil'] += parseInt(row['Oil']);
        mergedData[row['Country']]['Gas'] += parseInt(row['Gas']);
        mergedData[row['Country']]['Cement'] += parseInt(row['Cement']);
        mergedData[row['Country']]['Flaring'] += parseInt(row['Flaring']);
        mergedData[row['Country']]['Other'] += parseInt(row['Other']);
    });

    // 将合并后的数据转为数组形式
    let resultArray = Object.values(mergedData);

    // 遍历结果数组，分别按照 'Coal', 'Oil', 'Gas', 'Cement', 'Flaring' 列值从大到小排序
    let sortedCoal = resultArray.slice().sort((a, b) => b.Coal - a.Coal);
    let sortedOil = resultArray.slice().sort((a, b) => b.Oil - a.Oil);
    let sortedGas = resultArray.slice().sort((a, b) => b.Gas - a.Gas);
    let sortedCement = resultArray.slice().sort((a, b) => b.Cement - a.Cement);
    let sortedFlaring = resultArray.slice().sort((a, b) => b.Flaring - a.Flaring);
    let sortedOther = resultArray.slice().sort((a, b) => b.Other - a.Other);    

    let myGraph = document.getElementById('myGraph2');
    let trace1 = {};
    trace1.type = "pie";
    trace1.labels = [];
    trace1.values = [];
    trace1.hole =0.5;
    trace1.title ="Coal";

    let trace2 = {};
    trace2.type = "pie";
    trace2.labels = [];
    trace2.values = [];
    trace2.hole =0.5;
    trace2.title ="Oil";

    let trace3 = {};
    trace3.type = "pie";
    trace3.labels = [];
    trace3.values = [];
    trace3.hole =0.5;
    trace3.title ="Gas";
    
    let trace4 = {};
    trace4.type = "pie";
    trace4.labels = [];
    trace4.values = [];
    trace4.hole =0.5;
    trace4.title ="Cement";
    
    let trace5 = {};
    trace5.type = "pie";
    trace5.labels = [];
    trace5.values = [];
    trace5.hole =0.5;
    trace5.title ="Flaring";

    let trace6 = {};
    trace6.type = "pie";
    trace6.labels = [];
    trace6.values = [];
    trace6.hole =0.5;
    trace6.title ="Other";

    for(let i=0;i<10;i++){
        trace1.labels[i] = sortedCoal[i]['Country'];
        trace1.values[i] = sortedCoal[i]['Coal'];
    }

    for(let i=0;i<10;i++){
        trace2.labels[i] = sortedOil[i]['Country'];
        trace2.values[i] = sortedOil[i]['Oil'];
    }
    
    for(let i=0;i<10;i++){
        trace3.labels[i] = sortedGas[i]['Country'];
        trace3.values[i] = sortedGas[i]['Gas'];
    }
    
    for(let i=0;i<10;i++){
        trace4.labels[i] = sortedCement[i]['Country'];
        trace4.values[i] = sortedCement[i]['Cement'];
    }
    
    for(let i=0;i<10;i++){
        trace5.labels[i]= sortedFlaring[i]['Country'];
        trace5.values[i] = sortedFlaring[i]['Flaring'];
    }

    for(let i=0;i<10;i++){
        trace6.labels[i]= sortedOther[i]['Country'];
        trace6.values[i] = sortedOther[i]['Other'];
    }    
    
    
    let data1 = [];
    data1.push(trace1);
    data1.push(trace2);
    data1.push(trace3);
    data1.push(trace4);
    data1.push(trace5);
    data1.push(trace6);

    let layout = {
        title:"前十大碳排放量的國家(針對不同碳排放源)",
        updatemenus:[
            {   
                y:1.1,
                x:0.2,
                yanchor:'top',
                buttons:[
                    {
                        method:'restyle',
                        args:['visible',  [true, false, false, false, false, false]],
                        label:'Coal'
                    },
                    {
                        method: 'restyle',
                        args: ['visible', [false, true, false, false, false, false]],
                        label: 'Oil'
                    },
                    {
                        method: 'restyle',
                        args: ['visible', [false, false, true, false, false, false]],
                        label: 'Gas'
                    },
                    {
                        method: 'restyle',
                        args: ['visible', [false, false, false, true, false, false]],
                        label: 'Cement'
                    },
                    {
                        method: 'restyle',
                        args: ['visible', [false, false, false, false, true, false]],
                        label: 'Flaring'
                    },
                    {
                        method: 'restyle',
                        args: ['visible', [false, false, false, false, false, true]],
                        label: 'Other'
                    }
                ]
            }
        ]

    };

    Plotly.newPlot(myGraph, data1, layout);

});