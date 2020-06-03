<script>
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";

 anychart.onDocumentReady(function() {
    anychart.data.loadJsonFile(
      "https://cdn.anychart.com/charts-data/data_json.json",
      function(data) {
        // create a chart and set loaded data
        var chart = anychart.pie3d(data);
        // configure and display 
        chart.innerRadius(10);
        chart.title("Productos de belleza facial");
        chart.container("container");
        chart.draw();
      }
    );
  });
 
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
  <script>{}</script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js">

  </script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js">

  </script>
</svelte:head>
<main>
  
  <div id="container" />

  <Button outline color="secondary" on:click={pop}>Volver</Button>

</main>
