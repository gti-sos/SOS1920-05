<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
      
        let MyData = [];
        let MyDataGraph = [];
        const resData = await fetch("/api/v1/life_expectancies");
       MyData = await resData.json();
        MyData.forEach( (x) => {
            MyDataGraph.push({name: x.country + " " + x.year, data: [parseInt(x.women_life_expectancy), parseInt(x.men_life_expectancy), parseInt(x.average_life_expectancy)], pointPlacement: 'on'});
    });
    
    
        Highcharts.chart('container', {
           type: 'variablepie',
               chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
        },
              title: {
                text: 'Esperanza de vida',
                align: 'center',
        verticalAlign: 'middle',
        y: 60
              },
              subtitle: {
                text: 'Gráfica que refleja la experanza de vida de mujeres, hombres y la media'
                },
          
             tooltip: {
        pointFormat: '{series.name}: <b>{point.parseInt}</b>'
    },
  
    plotOptions: {
        variablepie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: MyDataGraph,
        type: 'variablepie',
        name: 'Browser share',
        innerSize: '50%',

         dataLabels: {
                    enabled: true
                }
            });
            
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load={loadGraph}></script>
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
    min-width: 320px; 
    max-width: 500px;
    margin: 1em auto;
}

#container {
    height: 400px;
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