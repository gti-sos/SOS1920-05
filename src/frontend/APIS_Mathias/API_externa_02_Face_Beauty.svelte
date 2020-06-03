<script>
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  async function loadGraph() {
    let MyData = [];
    let OtherData = [];
    const url = "https://cdn.anychart.com/charts-data/data_json.json";

    anychart.onDocumentReady(function() {
      // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
      // https://cdn.anychart.com/releases/8.7.1/js/anychart-data-adapter.min.js

      // Load JSON data and create a chart by JSON data.
      anychart.data.loadJsonFile(
        "https://cdn.anychart.com/charts-data/data_json.json",
        function(data) {
          // create a chart and set loaded data
          var chart = anychart.pie3d(data);
          // configure and display
          chart.title("Load JSON data and create a chart");
          chart.container("container");
          chart.draw();
        }
      );
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
  <script>
    src =
      "https://cdn.anychart.com/releases/8.7.1/js/anychart-data-adapter.min.js"on:load={loadGraph}
  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js">

  </script>
</svelte:head>
<main>
  <h3>Grafica esperanza de vida en media con casos de muertes por COVID 19</h3>

  <div id="container" />

  <Button outline color="secondary" on:click={pop}>Volver</Button>

</main>
