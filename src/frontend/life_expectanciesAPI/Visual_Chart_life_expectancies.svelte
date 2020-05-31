
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import Anychart from "anychart";

    async function loadGraph() {
      
    let MyData = [];
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();
    let countries = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d.country;})));
    let women_life_expectancy = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d["women_life_expectancy"];})));
    
    anychart.onDocumentReady(function () {
     var chart = anychart.area();

    // set the series type and data
    series = chart.area(Mydata);

    // set the chart title
    chart.title("Switching the Series Type");

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
});

// switch the series type
function switchType() {
  var select = document.getElementById("typeSelect");
  series.seriesType(select.value);
}
    }
</script>




<svelte:head>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-core.min.js" on:load={loadGraph}></script>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-pyramid-funnel.min.js" on:load={loadGraph}></script>
</svelte:head> 

<main >
    <h3>Esperanza de vida de mujeres en 2016</h3>
    <h6>Gráfica en la que se muestran la esperanza de vida de mujeres en 2016</h6>
    <select id="typeSelect" onchange="switchType()">
    <option value="area">Area</option>
    <option value="column">Column</option>
    <option value="jump-line">Jump Line</option>
    <option value="line">Line</option>
    <option value="marker">Marker</option>  
    <option value="spline-area">Spline Area</option>  
    <option value="spline">Spline</option>
    <option value="step-area">Step Area</option>
    <option value="step-line">Step Line</option>
    <option value="stick">Stick</option>
</select>
<div id="container"></div>
    <p></p>
    <Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>
<style>
 html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
select {
    margin: 10px 0 0 10px;
}
#container {
    position: absolute;
    width: 100%;
    top: 35px;
    bottom: 0;
}
</style>