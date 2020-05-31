
<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import anychart from "anychart";
    async function loadGraph() {
      
    let MyData = [];
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();
    let countries = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d.country;})));
    let women_life_expectancy = Array.from(new Set(MyData.filter(d => d.year == 2016).map((d) => {return d["women_life_expectancy"];})));
    
    anychart.onDocumentReady(function () {
    isAsync = false;

    var stage = anychart.graphics.create("container");

    chart = anychart.pie([15, 16, 30]);

    stage.listenOnce('stagerendered', function() {
if (isAsync) chart.title("Is Async");
    });

    chart.container(stage);
    
    // set rendering to asynchronous mode
    chart.draw(true);

    // In async mode your code will be executed before chart draw.
    isAsync = true;
   
});
    
    }
</script>




<svelte:head>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js" type="text/javascript" on:load={loadGraph}></script>
</svelte:head> 

<main >
    <h3>Esperanza de vida de mujeres en 2016</h3>
    <h6>Gráfica en la que se muestran la esperanza de vida de mujeres en 2016</h6>
    <p></p>
    <div id="container"></div>
<body>
    <div id="container" style="width: 500px; height: 400px;"></div>
</body>
    <p></p>
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