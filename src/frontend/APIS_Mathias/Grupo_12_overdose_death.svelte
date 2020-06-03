  	<script>
	import {onMount}from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
	
	let MyData = [];
  let incomingData = [];
  const url = "https://sos1920-12.herokuapp.com/api/v2/overdose-deaths";

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
          data: [parseInt(x.women_life_expectancy), 0]
        };
        mixedData.push(data);
      }
    });
    incomingData.forEach(x => {
      if (x.year==2016) {
        data = {
          name: x.country + " " + x.year,
          data: [0, parseInt(x.death_female)]
        };
        mixedData.push(data);
      }
    });

    Highcharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Esperanza de vida media de mujeres y muertes por sobredosis"
      },

      xAxis: {
        categories: ["Esperanza de vida", "Muertes por sobredosis"]
      },
     
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },

      credits: {
        enabled: false
      },
      series: mixedData,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: [
                {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              ]
            }
          }
        ]
      }
    });
  }
</script>

<style>
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
  }

  .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
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
  .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }
  .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }
  .highcharts-data-table tr:hover {
    background: #f1f7ff;
  }
</style>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js">

  </script>
  <script src="https://code.highcharts.com/modules/series-label.js">

  </script>
  <script src="https://code.highcharts.com/modules/exporting.js">

  </script>
  <script src="https://code.highcharts.com/modules/export-data.js">

  </script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadGraph}>

  </script>
</svelte:head>

<main>

  <h2 style="text-align: center;">
    <i class="fas fa-car" />
  </h2>
  <figure class="highcharts-figure">
    <div id="container" />
  </figure>
  <p align="center">
    <Button outarea color="secondary" on:click={pop}>Volver</Button>
  </p>
</main>

