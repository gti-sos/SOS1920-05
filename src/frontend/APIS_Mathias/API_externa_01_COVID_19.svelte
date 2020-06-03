<script>
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";


     let MyData = [];
  let incomingData = [];
    const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

  async function loadGraph() {
    const resData = await fetch("/api/v1/life_expectancies");
    MyData = await resData.json();

    const res = await fetch(url);
    incomingData = await res.json();
    let mixedData = [];
    let data = {};

    MyData.forEach(x => {
      if (x.year) {
        data = {
          name: x.country + " " + x.year,
          data: [parseInt(x.average_life_expectancy), 0]
        };
        mixedData.push(data);
      }
    });
    incomingData.forEach(x => {
      if (x.year==2017) {
        data = {
          name: x.country + " " + x.year,
          data: [0, parseInt(x.poverty_prp)]
        };
        mixedData.push(data);
      }
    });

    anychart.onDocumentReady(function() {
      // create data
      var data = [datosJuntos];

      // create a chart
      var chart = anychart.polar();

      // create a polygon series and set the data
      var series = chart.polygon(data);

      // set the type of the x-scale
      chart.xScale("ordinal");

      // enable sorting points by x
      chart.sortPointsByX(true);

      // set the inner radius
      chart.innerRadius(50);

      // set the chart title
      chart.title("Polygon Chart: Basic Sample");

      // set the container id
      chart.container("container");

      // initiate drawing the chart
      chart.draw();
    });
  
  }
</script>

<style>
  html,
  body,
  #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<svelte:head>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js">

  </script>
  <script
    src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"
    on:load={loadGraph}>

  </script>

</svelte:head>
<main>
  <h3>Grafica esperanza de vida en media con casos de muertes por COVID 19</h3>

  <div id="container" />

  <Button outline color="secondary" on:click={pop}>Volver</Button>

</main>
