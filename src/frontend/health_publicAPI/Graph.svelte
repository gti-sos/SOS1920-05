<script>
    import ApexCharts from 'apexcharts';

    function loadGraph(){
        

        var options = {
        chart: {
            type: 'bar'
        },
        series: [
            {
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            }
        ],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        }

        var chart = new ApexCharts(document.querySelector('#chart'), options)
        chart.render()
    }

</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfica de prueba.
        </p>
    </figure>

    <p></p>
</main>

