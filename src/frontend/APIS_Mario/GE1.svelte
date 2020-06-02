<script>
    import {pop} from "svelte-spa-router";
	import Button from "sveltestrap/src/Button.svelte";
    let Data = [];
    let countries = [];
    let CountriesData = [];
    let CountriesData2 = [];
    async function loadGraph(){
        const resData = await fetch("https://covid-193.p.rapidapi.com/statistics", {	
			"method": "GET",
			"headers": {
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "0f1c9a6651mshcc6fb880746f7d2p18a345jsna7eda5bbbed3"
			}
    		})
		CountriesData = await resData.json();
			console.log(CountriesData.response);
		
		CountriesData2 = CountriesData.response;
		CountriesData2.forEach((data) => {
				let country = { 
					'name': data.country,
					'value': data.deaths.total
			};
		Data.push(country);
		});
			Highcharts.chart('container', {
		chart: {
			type: 'packedbubble',
			height: '100%'
		},
		title: {
			text: 'Deaths caused by Covid-19'
		},
		tooltip: {
			useHTML: true,
			pointFormat: '<b>{point.name}:</b> {point.value} deaths'
		},
		plotOptions: {
			packedbubble: {
				minSize: '30%',
				maxSize: '120%',
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					splitSeries: false,
					gravitationalConstant: 0.02
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
		series: [{
			name: 'Countries',
			data: Data
		}]
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