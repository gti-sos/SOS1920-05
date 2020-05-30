<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
      
        let MyData = [];
        let MyDataGraph = [];
        const resData = await fetch("/api/v1/life_expectancies");
        MyData = await resData.json();
        MyData.forEach( (x) => {
            MyDataGraph.push({name: x.country + " " + x.year, data: [parseInt(x.women_life_expectancy), parseInt(x.men_life_expectancy), parseInt(x.average_life_expectancy)], pointPlacement: 'on'});
        });
        Highcharts.chart({
    chart: {
        renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
              title: {
                text: 'Esperanza de vida'
              },
              subtitle: {
                text: 'Gráfica que refleja la experanza de vida de mujeres, hombres y la media'
                },
              xAxis: {
                  
                categories:  [
                    'Esperanza de vida mujeres',
                    'Esperanza de vida hombres',
                    'Esperanza de vida media'
                ],
                crosshair: true
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Numeros',
                  align: 'high'
                },
                labels: {
                  overflow: 'justify'
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
        column: {
            depth: 25
        }
    },
              legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFF5FF'),
                shadow: true
              },
              credits: {
                enabled: false
              },
              series:MyDataGraph,
              responsive: {
                condition: {
                    maxWidth: 500
                    }
                }
            });
            
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <h2 style="text-align: center;"> <i class="fas fa-car"></i> Estadísticas de las esperanza de vida</h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <p align="center">
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
    </p>
</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
        min-width: 95%; 
        max-width: 100%;
        margin: 1em auto;
    }
    #container {
        height: 600px;
    }
    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>