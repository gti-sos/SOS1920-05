<script>
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  async function loadGraph() {
    let MyData = [];
    let OtherData = [];
    const url =
      " https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats/";

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

    let MyDataGraph = MyData.map(x => {
      let res = {
        name: x.country + " " + x.year,
        value: x["average_life_expectancy"]
      };
      return res;
    });
    let incominData = OtherData.map(x => {
      let res = { name: x.country + " " + x.year, value: x["cars-per-1000"] };
      return res;
    });

    let mixedData = [
      { name: "Esperanza de vida media", data: MyDataGraph },
      { name: "Coches eléctricos por cada 1000 habitantes", data: incominData }
    ];

    Highcharts.chart("container", {
      chart: {
        type: "packedbubble"
      },
      title: {
        text: "Esperanza de vida media y coches eléctricos por cada 1000 habitantes"
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:50"> </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: "</table>"
      },
      plotOptions: {
        packedbubble: {
          dataLabels: {
            enabled: true,

            style: {
              color: "black",
              textOutline: "none",
              fontWeight: "normal"
            }
          }
        }
      },
      series: mixedData
    });
  }
</script>

<style>
  main {
    text-align: center;
  }
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
  }

  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 320px;
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
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}>

  </script>
  >
  <script
    src="https://code.highcharts.com/highcharts-more.js"
    on:load={loadGraph}>

  </script>
  >
  <script
    src="https://code.highcharts.com/modules/exporting.js"
    on:load={loadGraph}>

  </script>
  >
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadGraph}>

  </script>
</svelte:head>
<main>
  <figure class="highcharts-figure">
    <div id="container" />
  </figure>

  <Button outline color="secondary" on:click={pop}>Volver</Button>

</main>
