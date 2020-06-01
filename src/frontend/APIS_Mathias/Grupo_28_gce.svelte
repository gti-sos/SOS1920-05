<script>
	import{onMount}from "svelte";
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
	


	async function loadGraph(){
		let MyData = [];
		let incomingData = [];
		const url = "/api/v1/gce";

		const resData = await fetch("/api/v1/life_expectancies");
		MyData = await resData.json();
		
		
		// MyData.forEach( (s) => {
		// 	let data = {
		// 		name: s.country + " " + s.year,
		// 		value: [s.average_life_expectancy, s["men_life_expectancy"]]
		// 	};
		// 	incomingData = data;
		// 	return incomingData;
		// });
		// const resData2 = await fetch(url);
		// grupo28gce = await resData2.json();
		// console.log(grupo28gce);
		// grupo28gce.forEach( (t) => {
		// 		let data = {name: t.country + " " + t.year,
        //         value: t["gce_per_capita"]
        //     	};
        //     	incomingData.push(data)    
		// });
		
		const result = await fetch(url);
		gceIncoming = await result.json();
		
        let MyOwn = MyData.map((x) => {
			let result = {name: x.country + " " + x.year, value: x["men_life_expectancy"]};
			return result;
        });
        let gceg = gceIncoming.map((x) => {
			let result = {name: x.country + " " + x.year, value: x["gce_per_capita"]};
			return result;
        });
		let datosMixtos = [{name: "Esperanza de vida media",data: MyData},{name: "gce_per_capita",data: incomingData}];
		
		 Highcharts.chart('container', {
              chart: {
                type: 'line'
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
                line: {
                     dataLabels: {
                    enabled: true
                  }
        }
    },
              legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
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
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: [{
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }]
            }
        }]
    }
            });
            
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
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
    min-width: 360px; 
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