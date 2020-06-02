<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

	async function loadGraphExt1(){
        console.log("Loading external api");
        
        const BASE_API_URL  = "/api/v1/health_public";
        const BASE_API_URL_External01 = "https://restcountries.eu/rest/v2/all?fields=name;area;population";
        const resData = await fetch(BASE_API_URL);
        const resDataExternal01 = await fetch(BASE_API_URL_External01);
        let MyData = await resData.json();
        let DataExternal01 = await resDataExternal01.json();
        console.log(DataExternal01);
        console.log(MyData);
            
            let dataPrimary = MyData.map((d) => {
                let res = {
                    name: d.country + " - " + d.year,
                    value: d["total_spending"]
                };
                return res;
            });
            let dataAPIExternal01 = DataExternal01.filter((d) => {return d.area > 5000000;}).map((d) =>  {
            let res = {
                name:  d.name + " - " + d.population,
                value: d.area
            };
            return res;
        });
        
        
		let datos = 
        [
            {
                name: "Millones de toneladas de petróleo.",
                data: dataPrimary
            },
            {
                name: "Area por País y Población.",
                data: dataAPIExternal01
            }
        ];
        Highcharts.chart('container-ext', {
			chart: {
				type: 'packedbubble',
				height: '100%'
			},
			title: {
				text: 'Relacion Consumo de petroleo por Países junto con Países y su Poblacion con un area meno que 250.'
			},
			tooltip: {
				useHTML: true,
				pointFormat: '<b>{point.name}:</b> {point.value}'
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
			series: datos
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