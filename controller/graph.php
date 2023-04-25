

<?php include('cbhn/graph.php') ?>
<!DOCTYPE html>
<html>
<head>
    <title>Program Participants Chart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<style>
    #chart-container {
        width: 100%;
        height: 500px;
    }
    #chart {
        width: 100%;
        height: 100%;
    }
</style>

<div id="chart-container">
    <canvas id="chart"></canvas>
</div>
    <script>
        var ctx = document.getElementById('chart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: <?php echo json_encode($labels); ?>,
                datasets: <?php echo json_encode($datasets); ?>
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Program Participants Chart'
                }
            }
        });
    </script>
</body>
</html>