<script>
	import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    


	async function loadGraph(){
        let jsonDiego = [];
		let jsonG23 = [];
		let datosConjuntos = [];
		let data = {};

        const url = "https://sos1920-23.herokuapp.com/api/v2/fires-stats/";

        const resData = await fetch("/api/v1/books-exports");
        jsonDiego = await resData.json();
		
		const res = await fetch(url);
		jsonG23 = await res.json();
		
		jsonDiego.filter((x) => {return x.year==2016 && x.country != "uk";}).forEach((x) => {
				data={name: x.country +" "+ x.year,	data: [parseInt(x.exp_graphic_sector),0]
				}
				datosConjuntos.push(data);
		});
		
		jsonG23.filter((x) => {return x.year==2008;}).forEach((x) => {
				data={name: x.community  +" "+ x.year,	data: [0,parseInt(x.total_fire)]
				}
				datosConjuntos.push(data);
		});

		Highcharts.chart('container', {
              chart: {
                type: 'bar'
              },
              xAxis: {
                  
                categories:  [
                    'Exportaciones Sector Grafico',
                    'Fuegos Totales',],
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
                shared: false,
                useHTML: false
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    enabled: false
                  }
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
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
              },
              credits: {
                enabled: false
              },
              series:datosConjuntos,
              responsive: {
                condition: {
                    maxWidth: 500
                    }
                }
			});
		}
		
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
    
</svelte:head>
<main>
    <h3> Grafica exportaciones del sector grafico (2016) y fuegos totales (2008) en el mundo</h3>
	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>
	
	<Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>

<style>
	main {
		text-align: center;
	}
    .highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
  max-width: 800px;
  margin: 1em auto;
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