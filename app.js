function fetch_data()
{
    var sharetime = [] 
    var sharevolume = []
    var sharehigh = []
    var sharelow = []
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=5min&apikey=7SLUNESLFIHGI9WQ'
    fetch(url)
    .then(response => response.json())
    .then( data => {
        console.log(data['Time Series (5min)'])
        var mydata = data['Time Series (5min)']
        var key, count = 0
        document.getElementById('datecard').style.visibility = 'visible'
        for (key in mydata)
        {
            if(mydata.hasOwnProperty(key))
            {
                var mykey = key.split(" ")
                // console.log(mykey[1])
                sharetime[count] = mykey[1]
                sharevolume[count] = Number(mydata[key]['5. volume'])
                sharehigh[count] = Number(mydata[key]['2. high'])
                sharelow[count] = Number(mydata[key]['3. low'])
                // console.log(sharelow[count])
                // console.log(sharevolume[count])
                // console.log(mykey[0])
                document.getElementById('cdate').innerHTML = 
                `<h3>Date: `+mykey[0]+`</h3>`
                count = count+1
            }
        }
        var max_price = Math.max(...sharehigh)
        console.log(max_price)
        var min_price = Math.min(...sharelow)
        console.log(min_price)
        document.getElementById('share_price').style.visibility = 'visible'
        document.getElementById('share_max').innerHTML = 
        `<h3>Max: `+max_price+`$</h3>`
        document.getElementById('share_min').innerHTML = 
        `<h3>Min: `+min_price+`$</h3>`

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      var dataRows = [['Time','Volume Traded']];
      for(var i=0;i<count;i++)
      {
        dataRows.push([sharetime[i],sharevolume[i]]);
      }

      function drawChart() {
        var data = google.visualization.arrayToDataTable(dataRows);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' },
          backgroundColor:{ fill:'#212529'},
          hAxis:{
            textStyle: { color: '#FFF'}
          },
          vAxis:{
            textStyle: { color: '#FFF'}
          },
          titleTextStyle: { color: '#FFF' },
          legendTextStyle: { color: '#FFF' },
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
    })
}