<script>
	import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    


	async function loadGraph(){
        let MyData = [];
        let OtherData = [];
        const url = "https://sos1920-01.herokuapp.com/api/v2/poverty-stats";

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
			let res = {name: x.country + " " + x.year, value: x["women_life_expectancy"]};
			return res;
        });
        let OtherDataGraph = OtherData.map((x) => {
			let res = {name: x.country + " " + x.year, value: x["em_totals"]};
			return res;
        });
        
		let datosConjuntos = [{name: "m1",data: MyDataGraph},
								{name: "g1",data: OtherDataGraph},
								 type, 'pie',
        						  allowPointSelect, true,
        						showInLegend, true];
        
                Highcharts.chart('container', {

    chart: {
        styledMode: true
    },

    title: {
        text: 'Pie point CSS'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: datosConjuntos
});
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
</svelte:head>
<main>
    <h3> g1</h3>
	<figure class="highcharts-figure">
		<div id="container"></div>
		 <p class="highcharts-description">
        Charts can be styled using CSS, such as this example overriding
        the default styles for a pie chart. This can be done without the
        use of Javascript, allowing designers and developers to better
        collaborate on chart design.
    </p>
	</figure>
	
	<Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>

<style>
	main {
		text-align: center;
	}
@import 'https://code.highcharts.com/css/highcharts.css';

.highcharts-pie-series .highcharts-point {
	stroke: #EDE;
	stroke-width: 2px;
}
.highcharts-pie-series .highcharts-data-label-connector {
	stroke: silver;
	stroke-dasharray: 2, 2;
	stroke-width: 2px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 600px;
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