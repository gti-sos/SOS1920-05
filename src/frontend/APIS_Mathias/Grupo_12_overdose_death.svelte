  	<script>
	import {onMount}from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
	
	
	async function loadGraph(){
        let MyData = [];
        let OtherData = [];
        const url = "https://sos1920-12.herokuapp.com/api/v2/overdose-deaths";

        const resData = await fetch("/api/v1/life_expectancies");
        MyData = await resData.json();

        console.log("Fetching url...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok");
            OtherData = await res.json();
		} else {
			console.log("Error al cargar API externa");
        }

        let MyDataGraph = MyData.map((x) => {
			let res = {name: x.country + " " + x.year, value: x["men_life_expectancy"]};
			return res;
        });
        let OtherDataGraph = OtherData.map((x) => {
			let res = {name: x.country + " " + x.year, value: x["death_male"]};
			return res;
        });
        
        let datosConjuntos = [{name: "Esperanza de vida",data: MyDataGraph},{name: "Hombres muerto por sobredosis",data: OtherDataGraph}];
        
  Highcharts.chart('container', {
			chart: {
				type: 'packedbubble',
				height: '100%'
			},
			tooltip: {
				useHTML: true,
				pointFormat: '<b>{point.name}:</b> {point.value}'
			},
			plotOptions: {
				packedbubble: {
					minSize: '35%',
					maxSize: '80%',
					zMin: 0,
					zMax: 100,
					layoutAlgorithm: {
						gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
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
    <h3> Grafica esperanza de vida en hombres y hombres muerto por sobredosis</h3>
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