// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["tesla", "google", "amazon","apple","microsoft"],
    datasets: [{
      data: [55, 30, 15,5,7],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#E74A3B','#F6C23E'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

// 플러그인 추가 - 특정 차트에만 중앙 텍스트 표시
myPieChart.pluginService = Chart.plugins.register({
  beforeDraw: function(chart) {
    if (chart.config.type === 'doughnut') { // 특정 차트 유형에만 적용
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = 24;
      ctx.font = fontSize + "px Nunito";
      ctx.textBaseline = "middle";

      // 중앙에 표시할 텍스트 - 총합 계산
      var total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      var text = total + "%";
      var textX = Math.round((width - ctx.measureText(text).width) / 2);
      var textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
});
