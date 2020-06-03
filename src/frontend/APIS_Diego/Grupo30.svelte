<script>
	import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    


	async function loadGraph(){
		let jsonDiego = [];
		let jsonG30 = [];
		let datosConjuntos = [];
		let data = {};
		
        const url = "https://sos1920-30.herokuapp.com/api/v3/indice_de_masa_corporal";

        const resData = await fetch("/api/v1/books-exports");
        jsonDiego = await resData.json();

		const res = await fetch(url); 
		jsonG30 = await res.json();

		jsonDiego.filter((x) => {return x.country == "mexico";}).forEach((x) => {
				data={name: x.country +" "+ x.year,	data: [parseInt(x.exp_graphic_sector),0]
				}
				datosConjuntos.push(data);
        });
		jsonG30.filter((x) => {return x.place == "Polonia";}).forEach((x) => {
			data={name: x.place  +" "+ x.year,	data: [0,parseInt(x.altura)]
				}
				datosConjuntos.push(data);
		});

		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			xAxis: {
				categories: ["Exportaciones Sector Grafico"," Altura"],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
				text: 'Numeros'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: false,
				useHTML: false
			},
			plotOptions: {
				column: {
				pointPadding: 0.2,
				borderWidth: 0
				}
			},
			series: datosConjuntos
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
    <h3> Grafica exportaciones del sector grafico en Francia y la altura en Polonia</h3>
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