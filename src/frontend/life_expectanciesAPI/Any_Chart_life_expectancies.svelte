
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import anychart from "anychart";
    
    async function loadGraph() {
      
    let MyData = [];
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();
    let countries = Array.from(new Set(MyData.filter(d => d.year==2016).map((d) => {return d.country;})));
    let women_life_expectancy = Array.from(new Set(MyData.filter(d => d.year==2016).map((d) => {return d["women_life_expectancy"];})));
    

        //var data = [countries, women_life_expectancy];

       anychart.onDocumentReady(function () {

    var data = [countries, women_life_expectancy];

    // create a 3d pie chart and set the data
    var chart = anychart.pie3d(data);

    // set the chart title
	  chart.title("Esperanza de vida en Italia en mujeres 2016");
    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
});
 
    }
 
</script>


<svelte:head>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"on:load={loadGraph}></script>
</svelte:head> 

<main >
     <div id="container"></div>
    
    <Button outline color="secondary" on:click="{pop}"> Volver</Button>

</main>

<style>

html, body, #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>