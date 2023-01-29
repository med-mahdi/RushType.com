//> This For Specefie The Place where Our Chart Gonna Be
let myChartSection = document.getElementById("myChart");



//> Function Return The Correct Date For Chart
function getUnRepeatedDates(records){
  var listResult = []
  var allDatesRepeated = records.map((rec)=>{
      return rec.date
  })
  allDatesRepeated.forEach(function(date){
      if (listResult.includes(date) == false){
          listResult.push(date)
      }
  })
  return listResult
}





//> This Function Return Correct Data Chart
function chartRecordData(dates,records){
  var resultArray = []
  dates.forEach(function(date){
      let i = 0;
      var big = 0;
      for (i;i < records.length;i++){
          if (records[i].date == date && records[i].wpm >= big){
              big = records[i].wpm
          } 
      }
      resultArray.push(big)
  })
  return resultArray;
}





//> This Function for Request The Data From API And Display It on my Chart
function getUserchartDATA(){
  var dates = []
  var wpms = []
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
      if (xhr.status == 200){
        var data = JSON.parse(xhr.responseText);

        dates = getUnRepeatedDates(data)
        wpms = chartRecordData(dates,data)

        if (wpms.length == 1 && wpms[0] == 0){
          wpms = [0,10];
        }

        const dataChart = {
          labels: dates,
          datasets: [{
            label: 'WPM  RECORDS',
            backgroundColor: "#ffc000",
            borderWidth:2.5,
            hoverBackgroundColor: "transparent",
            borderColor : "#ffc000",
            data: wpms,
          }]
          };
          const config = {
            type: 'line',
            data: dataChart,
            options: {}
          };
          const myChart = new Chart(myChartSection,config);
          }
        }
  xhr.open("GET","/typing/data/api")
  xhr.send()
}
getUserchartDATA();






