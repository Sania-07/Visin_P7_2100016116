google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1goo4e7426MmE_pRe_xksEeJXX9PMz57M3yLesbbJbHs';

    // Query untuk data penjualan produk berdasarkan kota
    var range1 = 'Sheet2!A1:E8';
    var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range1);
    query1.send(function(response1) {
        handleQueryResponse(response1, 'chart1', 'Penjualan Produk Berdasarkan Kota');
    });

    // Query untuk data total pendapatan berdasarkan kota
    var range2 = 'Sheet2!A12:B15';
    var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range2);
    query2.send(function(response2) {
        handleQueryResponse(response2, 'chart2', 'Total Pendapatan Berdasarkan Kota');
    });
}

function handleQueryResponse(response, chartId, chartTitle) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawChart(data, chartId, chartTitle);
}

function drawChart(data, chartId, chartTitle) {
    var options = {
        title: chartTitle,
        width: 400,
        height: 300,
        legend: 'none',
        chartArea: {
            left: 50,
            top: 40,
            width: '80%',
            height: '70%'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById(chartId));
    chart.draw(data, options);
    
}