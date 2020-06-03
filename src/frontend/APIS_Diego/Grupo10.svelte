<script>
	import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
	
	
	async function loadGraph(){
        let jsonDiego = [];
        let jsonG10 = [];
		let data = {};
		let datosConjuntos = [];
        const url = "https://sos1920-10.herokuapp.com/api/v3/global-marriages";

        const resData = await fetch("/api/v1/books-exports");
        jsonDiego = await resData.json();

		const res = await fetch(url); 
		jsonG10 = await res.json();
		jsonDiego.filter((x) => {return x.year==2015;}).forEach((x) => {
				data={name: x.country +" "+ x.year,	data: [parseInt(x.exp_editorial),0]
				}
			datosConjuntos.push(data);
        });
		jsonG10.filter((x) => {return x.year==2018;}).forEach((x) => {
				data={name: x.country +" "+ x.year,	data: [0,parseInt(x.marriages)]
				}
			datosConjuntos.push(data);
		});
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			xAxis: {
				categories: ["Exportaciones Editoriales"," Bodas"],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
				text: 'Numero'
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
    <h3> Grafica exportaciones de editoriales(2015) y bodas (2018) en el mundo</h3>
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