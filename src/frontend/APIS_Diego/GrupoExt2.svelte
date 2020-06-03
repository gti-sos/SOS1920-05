<script>
    import {
            pop
	} from "svelte-spa-router";
    
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph() {
		let datosConjuntos = [];   
		let diego = [];
		let breweries = [];
		
		const url = "https://api.openbrewerydb.org/breweries";
		const resDataDiego = await fetch("/api/v1/books-exports");
		diego = await resDataDiego.json();
		
		const resDataBreweries = await fetch(url);
		breweries = await resDataBreweries.json();
		
		let datos_diego = diego.map((x) => {
				let res = {name: x.country + " " + x.year,value: x["exp_editorial"]};
				return res;
			});
		let datos_breweries = breweries.map((x) => {
				let res = {name: x.city,value: parseInt(x.phone)};
				console.log(res);
				return res;
			});
			
			datosConjuntos = [{name: "Exportaciones de editoriales",data: datos_diego},{name: "Numero cerveceria EEUU",data: datos_breweries}];

			Highcharts.chart('container', {
				chart: {
					type: 'packedbubble',
					height: '60%'
				},
				tooltip: {
					useHTML: true,
					pointFormat: '<b>{point.name}:</b> {point.value}'
				},
				plotOptions: {
					packedbubble: {
						minSize: '10%',
						maxSize: '100%',
						zMin: 0,
						zMax: 1000,
						layoutAlgorithm: {
							gravitationalConstant: 0.05,
							splitSeries: true,
							seriesInteraction: false,
							dragBetweenSeries: false,
							parentNodeLimit: true
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
							filter: {
								property: 'y',
								operator: '>',
								value: 250
							},
							style: {
								color: 'black',
								textOutline: 'none',
								fontWeight: 'normal'
							}
						}
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
    <h2> Representacion de las exportaciones de editoriales en el mundo y el numero de cervecerias en EEUU</h2>
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