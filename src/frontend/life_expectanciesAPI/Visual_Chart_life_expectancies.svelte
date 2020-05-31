
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

    var options = {
          series: women_life_expectancy,
          chart: {
          width: 600,
          type: 'funnel',
        },
        labels: countries,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };
var chart = new Anychart(document.querySelector("#chart"), options);
        chart.render();
        chart = anychart.funnel(data);

// set the container id
chart.container("container");

// initiate drawing the chart
chart.draw();
    }
</script>




<svelte:head>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-core.min.js" on:load={loadGraph}></script>
<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-pyramid-funnel.min.js" on:load={loadGraph}></script>
</svelte:head> 

<main >
    <h3>Esperanza de vida de mujeres en 2016</h3>
    <h6>Gráfica en la que se muestran la esperanza de vida de mujeres en 2016</h6>
    <div id="container"></div>
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