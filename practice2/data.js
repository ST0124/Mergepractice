d3.csv('./practice2/GCB2022v27_MtCO2_flat.csv').then(data => {
    
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
    // 初始化一个空对象用于存储每个国家的总值
    let countryTotals = {};

    // 遍历 DataFrame，将相同 'Country' 列的 'Total' 列的值相加
    df.forEach(row => {
        const country = row['Country'];
        const total = parseFloat(row['Total']);
        if (!isNaN(total)) {
            if (countryTotals[country] === undefined) {
                countryTotals[country] = total;
            } else {
                countryTotals[country] += total;
            }
        }        
    });

    // 创建新的 DataFrame，只包含 'Country' 和 'Total' 列
    const newDf = Object.keys(countryTotals).map(country => ({
        'Country': country,
        'Total': countryTotals[country],
    }));
    newDf.sort((a, b) => b.Total - a.Total);

    let myGraph = document.getElementById('myGraph1');
    let trace1 = {};
    trace1.type = "bar";
    trace1.name = '排碳量'

    trace1.x = [];
    trace1.y = [];

    for(let i=0;i<10;i++){
        trace1.x[i] = newDf[i]['Country'];
        trace1.y[i] = newDf[i]['Total'];
    }
    
    let data1 = [];
    data1.push(trace1);

    let layout = {
        margin:{
            t:30
        },
        title: '前十大排碳量的國家',
        xaxis: {
          title: '國家',
        },
        yaxis: {
          title: '排碳量',
        }
    };

    Plotly.newPlot(myGraph, data1, layout);
});
