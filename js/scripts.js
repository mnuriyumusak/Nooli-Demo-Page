
var enable = new Array();
var date_arr = new Array();
var air_temp = new Array();
var soil_mois2 = new Array();
var soil_mois1 = new Array();
var bat_vol = new Array();
var air_pre = new Array();
var ec2 = new Array();
var ec1 = new Array();
var soil_temp1 = new Array();
var soil_temp2 = new Array();
var air_hum = new Array();
var checkbox = new Array();
var colors = new Array();
var numberOfElement = 10;
var ctx;
var data;
var myLineChart;

function setTheCircles()
{
  var percentBattery = Math.round(bat_vol[bat_vol.length-1]*100/6);
  document.getElementById("bat").textContent = "%"+percentBattery;
  document.getElementById("bat1").textContent = bat_vol[bat_vol.length-1]+"V";
  document.getElementById("temp").textContent = ""+ Math.round(air_temp[air_temp.length-1])+"°C";
  document.getElementById("hum").textContent = "%"+ Math.round(air_hum[air_hum.length-1]);
}

function notifications()
{
  if(air_temp[air_temp.length-1] >= 25)
  document.getElementById("warn1").textContent = "- You should irrigate the plant.";
  if(bat_vol[bat_vol.length-1] <= 1)
  document.getElementById("warn2").textContent = "- Battery level is critic!";
}

function App(){
  getData();
  for(var i = 0 ; i < numberOfElement ; i++)
  {
    checkbox[i] = document.getElementById("c"+i);
  }
}

function checkBoxControl( )
{
  for(var i = 0 ; i < numberOfElement ; i++)
  enable[i] = checkbox[i].checked;

  drawChart(date_arr,air_temp,soil_mois2,soil_mois1,bat_vol,air_pre,ec2,ec1,soil_temp1,soil_temp2,air_hum,air_temp,enable);
}

function getData() {

  $.get("http://level1.akfiha.appspot.com/data/nooli/web/api", function(data) {
    for(var i = data["data_list"].length-1 ; i >= 0 ; i--)
    {
      date_arr[i] = data["data_list"][i]["date"];
      air_temp[i] = data["data_list"][i]["air_temp"];
      soil_mois2[i] = data["data_list"][i]["soil_mois2"];
      soil_mois1[i] = data["data_list"][i]["soil_mois1"];
      bat_vol[i] = data["data_list"][i]["bat_vol"];
      air_pre[i] = data["data_list"][i]["air_pre"];
      ec2[i] = data["data_list"][i]["ec2"];
      ec1[i] = data["data_list"][i]["ec1"];
      soil_temp1[i] = data["data_list"][i]["soil_temp1"];
      soil_temp2[i] = data["data_list"][i]["soil_temp2"];
      air_hum[i] = data["data_list"][i]["air_hum"];
    }
    date_arr.reverse();
    air_temp.reverse();
    soil_mois2.reverse();
    soil_mois1.reverse();
    bat_vol.reverse();
    air_pre.reverse();
    ec2.reverse();
    ec1.reverse();
    soil_temp1.reverse();
    soil_temp2.reverse();
    air_hum.reverse();
    air_temp.reverse();

    for(var i = 0 ; i < numberOfElement ; i++)
    enable[i] = false;
    enable[0] = true;

    drawChart(date_arr,air_temp,soil_mois2,soil_mois1,bat_vol,air_pre,ec2,ec1,soil_temp1,soil_temp2,air_hum,air_temp,enable);
  });
}

function setColors()
{
  colors[0] = 'rgba(' + (162) + ',' + (197) + ',' + (122) + ',' + (0.6 || '.3') + ')';
  colors[1] = 'rgba(' + (85) + ',' + (114) + ',' + (52) + ',' + (0.6 || '.3') + ')';
  colors[2] = 'rgba(' + (78) + ',' + (81) + ',' + (28) + ',' + (0.6 || '.3') + ')';
  colors[3] = 'rgba(' + (161) + ',' + (167) + ',' + (61) + ',' + (0.6 || '.3') + ')';
  colors[4] = 'rgba(' + (223) + ',' + (210) + ',' + (136) + ',' + (0.6 || '.3') + ')';
  colors[5] = 'rgba(' + (162) + ',' + (197) + ',' + (122) + ',' + (0.6 || '.3') + ')';
  colors[6] = 'rgba(' + (85) + ',' + (114) + ',' + (52) + ',' + (0.6 || '.3') + ')';
  colors[7] = 'rgba(' + (78) + ',' + (81) + ',' + (28) + ',' + (0.6 || '.3') + ')';
  colors[8] = 'rgba(' + (161) + ',' + (167) + ',' + (61) + ',' + (0.6 || '.3') + ')';
  colors[9] = 'rgba(' + (223) + ',' + (210) + ',' + (136) + ',' + (0.6 || '.3') + ')';
}


function drawChart(date_arr,air_temp,soil_mois2)
{
  var lineChartData = {
    labels: date_arr,
    datasets: [{
      hidden : !enable[0],
      label: "Temperature",
      data: air_temp,
      yAxisID: "y-axis-1",
    }, {
      hidden : !enable[1],
      label: "soil_mois1",
      data: soil_mois1,
      yAxisID: "y-axis-2"
    },
    {
      hidden : !enable[2],
      label: "soil_mois2",
      data: soil_mois2,
      yAxisID: "y-axis-3"
    },
    {
      hidden : !enable[3],
      label: "bat_vol",
      data: bat_vol,
      yAxisID: "y-axis-4"
    },
    {
      hidden : !enable[4],
      label: "air_pre",
      data: air_pre,
      yAxisID: "y-axis-5"
    },
    {
      hidden : !enable[5],
      label: "ec1",
      data: ec2,
      yAxisID: "y-axis-6"
    },
    {
      hidden : !enable[6],
      label: "ec2",
      data: ec2,
      yAxisID: "y-axis-7"
    },
    {
      hidden : !enable[7],
      label: "soil_temp1",
      data: soil_temp1,
      yAxisID: "y-axis-8"
    },
    {
      hidden : !enable[8],
      label: "soil_temp2",
      data: soil_temp2,
      yAxisID: "y-axis-9"
    },
    {
      hidden : !enable[9],
      label: "air_hum",
      data: air_hum,
      yAxisID: "y-axis-10"
    },
  ]
};

//When it cahanges, redraw
if(myLineChart != null)
{
  for(var i = 0; i< numberOfElement; i++)
  {
    myLineChart.data.datasets[i].hidden = lineChartData.datasets[i].hidden;
    myLineChart.options.scales.yAxes[i].display = enable[i];
  }
  /*
  for(var p = numberOfElement; p >= 0 ; p--)
  if(enable[p])
  {
  myLineChart.options.scales.yAxes[p].display = true;
  break;
}
*/
myLineChart.update();
}
//First time draw, page load
else {
  setTheCircles();
  notifications();
  setColors();
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
  };

  var randomColor = function(opacity) {
    return 'rgba(' + (Math.round(Math.random() * 228)+107) + ',' + (Math.round(Math.random() * 235)+115) + ',' + (Math.round(Math.random() * 178)+50) + ',' + (opacity || '.3') + ')';
  };

  //giving colors to graph
  $.each(lineChartData.datasets, function(i, dataset) {
    console.log(i);
    dataset.borderColor = randomColor(0.6);
    dataset.backgroundColor = colors[i];
    dataset.pointBorderColor = randomColor(0.6);
    dataset.pointBackgroundColor = randomColor(0.6);
    dataset.pointBorderWidth = 1;
  });

  //create the chart with its options
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLineChart = Chart.Line(ctx, {
    tooltipTemplate: "<%= value %>",
    showTooltips: true,
    data: lineChartData,
    options: {
      legend: {
        display: false,
      },
      tooltips: {
        mode:"label",

      },
      responsive: true,
      hoverMode: 'single',
      stacked: false,
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            offsetGridLines: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          id: "y-axis-1",
          scaleLabel: {
            display: true,
            labelString: 'Temp C'
          }

        }, {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-2",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          scaleLabel: {
            display: true,
            labelString: 'C'
          }
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-3",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-4",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-5",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-6",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-7",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-8",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-9",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: "right",
          id: "y-axis-10",
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }
      ],
    }
  }
});

;}
}
