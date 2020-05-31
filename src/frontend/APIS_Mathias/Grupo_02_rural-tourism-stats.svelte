<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

	let MyData = [];
	let Grupo_02_rural_tourism = [];
	
	async function loadGraph(){
		
		const resData = await fetch("/api/v1/life_expectancies");
		MyData = await resData2.json();
		const resData2 = await fetch("/api/v2/rural-tourism-stats");
		if (resData.ok) {
			console.log("Ok, rural tourism up");
			const json = await resData.json();
            Grupo_02_rural_tourism = json;
			console.log(Grupo_02_rural_tourism)
		} else {
			console.log("ERROR!");
        }
		let aux = []
		let valores = []
		MyData.forEach((x) => {
        	if(x.year==2016 && (x.women_life_expectancy,x.men_life_expectancy,0)){	
				aux={
					name: x.country,
					data: [0,0,x.average_life_expectancy]
				}
				valores.push(aux)
			}
        });
		Grupo_02_rural_tourism.forEach((x) => {
			aux={
				name: x.province,
				data: [x.province=="malaga"||x.province=="cadiz"||x.province=="cordoba"]
			}
			valores.push(aux)
		
        });

		Highcharts.chart('container', {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Esperanza de vida con turismo rural'
			},
			xAxis: {
				categories: ['Mujeres', 'Hombres', 'Estancia'],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				labels: {
					overflow: 'justify'
				}
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			credits: {
				enabled: false
			},
			series: valores
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
	<h3 style="text-align: center;"> Integración con Grupo_02_rural-tourism-stats</h3>
	<Button outline color="secondary" on:click="{pop}">Volver</Button>
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p style="text-align:center;" class="highcharts-description">
			Comparativa entre la esperanza de vida y turismo rural
		</p>
	</figure>

</main>

<style>
	.highcharts-figure, .highcharts-data-table table {
		min-width: 310px; 
		max-width: 800px;
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