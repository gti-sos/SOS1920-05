<script>
	import {onMount}from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
	
	
	async function loadGraph(){
        let MyData = [];
        let OtherData = [];
        const url = " https://sos1920-01.herokuapp.com/api/v2/poverty-stats";

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
			let res = {name: x.country + " " + x.year, value: x["poverty_prp"]};
			return res;
        });
        
        let datosConjuntos = [{name: "Esperanza de vida",data: MyDataGraph},{name: "Nivel de pobreza",data: OtherDataGraph}];
        
                Highcharts.chart('container', {
    chart: {
        type: 'variablepie'
    },
    title: {
        text: 'Countries compared by population density and total area.'
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Area (square km): <b>{point.y}</b><br/>' +
            'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        data: datosConjuntos
            
    }]
});

    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/variable-pie.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"  on:load={loadGraph}></script>></script>

    
</svelte:head>
<main>
    <h3> Grafica exportaciones de libros y emigrantes en el mundo</h3>
	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>
	
	<Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>

<style>
	#container {
	height: 500px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 700px;
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